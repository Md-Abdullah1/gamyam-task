import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, Modal, Card, Table, Pagination } from "antd";
import debounce from "lodash.debounce";
import {
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ProductForm from "../../components/productForm";

const ProductListPage = () => {
  const { items } = useSelector((state) => state.products);
  const [filtered, setFiltered] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("grid"); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 10;

  // --- Debounced search ---
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        const filteredList = items.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setFiltered(filteredList);
        setCurrentPage(1);
      }, 500),
    [items]
  );

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  // --- Pagination logic ---
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

  // --- Table columns for list view ---
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 🔍 Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-64"
        />
        <div className="flex items-center gap-2">
          <Button
            icon={<AppstoreOutlined />}
            type={view === "grid" ? "primary" : "default"}
            onClick={() => setView("grid")}
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={view === "list" ? "primary" : "default"}
            onClick={() => setView("list")}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* 🧱 Product View Section */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              className="shadow-sm cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <p>
                <b>Category:</b> {item.category}
              </p>
              <p>
                <b>Price:</b> ₹{item.price}
              </p>
              <p>
                <b>Stock:</b> {item.stock}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
        />
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* ➕ Add Product Modal */}
      <Modal
        open={isModalOpen}
        title="Add Product"
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <ProductForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProductListPage;
