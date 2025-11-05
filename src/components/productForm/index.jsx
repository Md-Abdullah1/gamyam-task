import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../redux/slices/ProductSlice";

const ProductForm = ({ product, closeModal }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
        if (product) form.setFieldsValue(product);
    }, [product, form]);

    const onFinish = (values) => {
        if (product) {
            dispatch(editProduct({ ...product, ...values }));
        } else {
            dispatch(addProduct(values));
        }
        closeModal();
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="stock" label="Stock">
                <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full">
                {product ? "Update Product" : "Add Product"}
            </Button>
        </Form>
    );
};

export default ProductForm;
