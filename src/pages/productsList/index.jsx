import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Input, Button, Modal, Card, Table, Pagination } from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ProductForm from "../../components/productForm";

const ProductListPage = () => {
  const { items } = useSelector((state) => state.products);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(localStorage.getItem('view') || "grid");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 10;

  //  Debounced search
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        const filteredList = items.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filteredList);
        setCurrentPage(1);
      }, 500),
    [items]
  );

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  // handling products view
  const handleViewUpdate = (value) => {
    setView(value);
    localStorage.setItem('view', value)
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredItems.slice(startIndex, startIndex + pageSize);

  //  Table columns for list view 
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price" },
    { title: "Stock", dataIndex: "stock" },
    {
      title: "Action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/product/${record?.id}`)}>
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
            onClick={() => handleViewUpdate('grid')}
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={view === "list" ? "primary" : "default"}
            onClick={() => handleViewUpdate('list')}
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

      {/* Product View Section */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData?.length > 0 && paginatedData.map((item) => (
            <Card
              key={item?.id}
              title={item?.name}
              className="shadow-sm cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <p>
                <b>Category:</b> {item?.category}
              </p>
              <p>
                <b>Price:</b> ₹{item?.price}
              </p>
              <p>
                <b>Stock:</b> {item?.stock}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}

      {/*  Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredItems.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Add Product Modal */}
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
