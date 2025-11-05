import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Card } from "antd";
import ProductForm from "../../components/productForm";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.products);
    const product = items.find((p) => p.id === Number(id));
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!product) return <p className="text-center mt-10">Product not found</p>;

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <Card title={product.name} bordered={true}>
                <p><b>Category:</b> {product.category}</p>
                <p><b>Price:</b> ₹{product.price}</p>
                <p><b>Stock:</b> {product.stock}</p>
                <p><b>Description:</b> {product.description || "No description"}</p>
                <p><b>Created At:</b> {new Date(product.createdAt).toLocaleString()}</p>
            </Card>

            <div className="flex justify-between">
                <Button onClick={() => navigate("/")}>Back</Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Edit Product
                </Button>
            </div>

            <Modal
                open={isModalOpen}
                title="Edit Product"
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <ProductForm product={product} closeModal={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ProductDetailPage;
