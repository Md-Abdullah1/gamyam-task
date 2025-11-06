import { useState, useMemo, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Input, Button, Modal, Card, Table, Pagination } from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../../components/productForm";

const ProductListPage = () => {
  const { items } = useSelector((state) => state.products);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(localStorage.getItem("view") || "grid");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 10;

  //  Debounced Search
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

  // Toggle Grid/List View
  const handleViewUpdate = (value) => {
    setView(value);
    localStorage.setItem("view", value);
  };

  //  Pagination Logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredItems.slice(startIndex, startIndex + pageSize);

  //  Table Columns
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

  //  Animation Variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
  }), [])

  const itemVariants = useMemo(() => (
    {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }
  ), [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6"
    >
      {/*  Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-center gap-3"
      >
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
            onClick={() => handleViewUpdate("grid")}
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={view === "list" ? "primary" : "default"}
            onClick={() => handleViewUpdate("list")}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </Button>
        </div>
      </motion.div>

      {/*  Product View Section */}
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key={`grid-${currentPage}-${paginatedData?.length}-${view}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {paginatedData?.length > 0 ?
              paginatedData.map((item) => (
                <motion.div
                  key={item?.id}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 hover:shadow-lg cursor-pointer transition-all"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item?.category}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    ₹{item?.price}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Stock: {item?.stock}
                  </p>
                </motion.div>
              )) : (
                <p>No Items Found</p>
              )}
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${currentPage}-${paginatedData?.length}-${view}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm"
          >
            <Table
              columns={columns}
              dataSource={paginatedData}
              rowKey="id"
              pagination={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/*  Pagination */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-4 pb-6"
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredItems.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </motion.div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            title={
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Add Product
              </motion.div>
            }
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            destroyOnClose
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ProductForm closeModal={() => setIsModalOpen(false)} />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(ProductListPage);
