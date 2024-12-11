import { useState } from "react";
import { baseURL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function AddProduct() {
    const navigate = useNavigate();

    const [txtname, setName] = useState("");
    const [txtdescription, setdescription] = useState("");
    const [fileimage, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const uploadProduct = async () => {
        const formData = new FormData();
        formData.append("name", txtname);
        formData.append("description", txtdescription);
        formData.append("image", fileimage);

        const response = await axios.post(`${baseURL}/api/products`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response) {
            toast.success(response.data.message);
            navigate("/productlist");
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
                    Add Product
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Product Title"
                                variant="outlined"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
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
                        <Grid size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ py: 1.5 }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default AddProduct;
