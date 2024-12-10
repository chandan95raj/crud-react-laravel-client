import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

function ProductList() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = () => {
            fetch(`${baseURL}/api/products`)
                .then((res) => res.json())
                .then((response) => {
                    console.log(response.products);
                    setProduct(response.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getProduct();
    }, []);

    const handleDeleteClick = (id) => {
        const confirmDelete = () =>
            toast(
                ({ closeToast }) => (
                    <div>
                        <p>Are you sure you want to delete this product?</p>
                        <Button
                            onClick={() => {
                                deleteProduct(id);
                                closeToast();
                            }}
                            variant="contained"
                            color="error"
                            size="small"
                            style={{ marginRight: 8 }}
                        >
                            Yes
                        </Button>
                        <Button variant="contained"
                            color="info"
                            size="small" onClick={closeToast}>No</Button>
                    </div>
                ),
                { autoClose: false }
            );

        confirmDelete();
    };

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}/api/productdelete/${id}`)
            .then((response) => {
                console.log(response);
                toast.success("Product successfully deleted!");
                setProduct((prev) => prev.filter((pdata) => pdata.id !== id));
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to delete the product");
            });
    };


    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Product List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sr.No</TableCell>
                            <TableCell>Product Title</TableCell>
                            <TableCell>Product Description</TableCell>
                            <TableCell align="center">Product Image</TableCell>
                            <TableCell align="center" width="200">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.map((pdata, index) => (
                            <TableRow key={pdata.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell className="text-capitalize">{pdata.name}</TableCell>
                                <TableCell>{pdata.description}</TableCell>
                                <TableCell align="center">
                                    <img
                                        src={`${baseURL}/storage/app/public/${pdata.image}`}
                                        alt="Product"
                                        style={{
                                            height: 60,
                                            width: 80,
                                            borderRadius: "4px",
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center" gap={1}>
                                        <Button
                                            component={Link}
                                            to={`/editproduct/${pdata.id}/edit`}
                                            variant="contained"
                                            color="success"
                                            size="small"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteClick(pdata.id)}
                                            variant="contained"
                                            color="error"
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ProductList;
