import { memo, useEffect } from "react";
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
        console.log('yes updating values', values, product)
        if (product) {
            dispatch(editProduct({ ...product, ...values }));
        } else {
            dispatch(addProduct(values));
        }
        closeModal();
    };

    const allowOnlyNumbers = (e) => {
        const key = e.key;
        if (
            ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(key)
        ) {
            return;
        }

        if (!/[0-9.]/.test(key)) {
            e.preventDefault();
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Product Name */}
            <Form.Item
                name="name"
                label="Product Name"
                rules={[
                    { required: true, message: "Please enter the product name" },
                    { min: 3, message: "Product Name should have at least 3 characters" },
                ]}
            >
                <Input placeholder="Enter product name" />
            </Form.Item>

            {/* Price */}
            <Form.Item
                name="price"
                label="Price"
                rules={[
                    { required: true, message: "Please enter the price" },
                    {
                        type: "number",
                        min: 1,
                        message: "Price must be a positive number",
                    },
                ]}
            >
                <InputNumber
                    className="w-full"
                    placeholder="Enter price"
                    onKeyDown={allowOnlyNumbers}
                    formatter={(value) =>
                        value ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                    }
                    parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                />
            </Form.Item>


            {/* Category */}
            <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please enter a category" }]}>
                <Input placeholder="e.g. Sports, Electronics, Clothing, etc." />
            </Form.Item>

            {/* Stock */}
            <Form.Item
                name="stock"
                label="Stock Quantity"
                rules={[
                    { required: true, message: "Please enter stock quantity" },
                    {
                        type: "number",
                        min: 0,
                        message: "Stock cannot be negative",
                    },
                ]}>
                <InputNumber
                    className="w-full"
                    placeholder="Enter stock quantity"
                    min={1}
                    onKeyDown={allowOnlyNumbers} />
            </Form.Item>

            {/* Description */}
            <Form.Item
                name="description"
                label="Description"
                rules={[

                    { max: 200, message: "Description can be up to 200 characters" },
                ]}>
                <Input.TextArea rows={3} placeholder="Enter short description" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full">
                {product ? "Update Product" : "Add Product"}
            </Button>
        </Form>
    );
};

export default memo(ProductForm);
