import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders of current user
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/orders/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data || data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        Swal.fire("Error", "Failed to load orders", "error");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Delete order
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the order permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`http://localhost:5000/orders/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          const deletedCount =
            data.deletedCount || data.result?.deletedCount || 0;
          if (deletedCount > 0) {
            Swal.fire("Deleted", "Order removed successfully", "success");
            setOrders((prev) => prev.filter((o) => o._id !== id));
          } else {
            Swal.fire("Info", "Order not deleted", "info");
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to delete order", "error");
        });
    });
  };

  // Download PDF report of current orders (jsPDF + autotable)
  const handleDownloadReport = () => {
    if (!orders || orders.length === 0) {
      Swal.fire("No Data", "You have no orders to export", "info");
      return;
    }

    const doc = new jsPDF();
    const title = "My Orders Report";
    doc.setFontSize(16);
    doc.text(title, 14, 20);

    const tableColumn = [
      "Order ID",
      "Product Name",
      "Buyer",
      "Price",
      "Qty",
      "Phone",
      "Address",
      "Date",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const row = [
        order._id || order.orderId || "",
        order.productName || order.listingName || "",
        order.buyerName || order.buyer || order.email || "",
        order.price != null ? order.price : "",
        order.quantity != null ? order.quantity : "",
        order.phone || "",
        order.address || "",
        order.date ? new Date(order.date).toLocaleDateString() : "",
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("my-orders-report.pdf");
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* page title */}
      <title>My Orders</title>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex gap-2">
          <button onClick={handleDownloadReport} className="btn btn-outline">
            Download Report (PDF)
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Buyer</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.productName || o.listingName}</td>
                  <td>{o.buyerName || o.email}</td>
                  <td>{o.price === 0 ? "Free" : o.price}</td>
                  <td>{o.quantity ?? 1}</td>
                  <td>{o.phone || "-"}</td>
                  <td>{o.address || "-"}</td>
                  <td>
                    {o.date ? new Date(o.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(o._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
