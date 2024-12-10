/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [txtname, setName] = useState("");
    const [txtdescription, setDescription] = useState("");
    const [fileimage, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // Fetch product data on component mount
    const getProduct = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/products/${id}`);
            if (response && response.data.product) {
                const { name, description, image } = response.data.product;
                setName(name);
                setDescription(description);
                setPreview(`${baseURL}/storage/app/public/${image}`);
            }
        } catch (error) {
            toast.error("Failed to fetch product details.");
            console.error(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    // Handle product update
    const uploadProduct = async () => {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", txtname);
        formData.append("description", txtdescription);

        // Append image only if a new image is selected
        if (fileimage) {
            formData.append("image", fileimage);
        }

        try {
            const response = await axios.post(`${baseURL}/api/productsupdate/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate("/productlist");
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to update the product. Please try again.");
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadProduct();
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Product
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        {/* Product Title */}
                        <Grid  size={{ xs:12}}>
                            <TextField
                                fullWidth
                                label="Product Title"
                                variant="outlined"
                                value={txtname}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        {/* Product Description */}
                        <Grid  size={{ xs:12}}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={txtdescription}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>

                        {/* Image Upload */}
                        <Grid  size={{ xs:12}}>
                            <Typography variant="subtitle1" gutterBottom>
                                Upload Product Image
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    startIcon={<PhotoCamera />}
                                >
                                    Choose Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Selected Preview"
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: 8,
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                )}
                            </Box>
                        </Grid>

                        {/* Submit Button */}
                        <Grid  size={{ xs:12}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="small"
                                fullWidth
                                sx={{ py: 1.5 }}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default EditProduct;
