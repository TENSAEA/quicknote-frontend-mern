import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectAllProducts,
} from "./productSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ProductStyles.css"; // Assuming you have created this CSS file

const Products = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.currentUserId);
  const allProducts = useSelector(selectAllProducts);
  const userProducts = allProducts.filter(
    (product) => product.user === currentUserId
  );
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ title: "", description: "" });
  };

  const handleUpdateProduct = () => {
    if (currentProduct && currentProduct._id) {
      const { _id, __v, user, createdAt, updatedAt, ...updateData } =
        currentProduct;
      dispatch(
        updateProduct({
          id: _id,
          ...updateData,
        })
      );
      setEditMode(false);
      setCurrentProduct(null);
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditClick = (product) => {
    setEditMode(true);
    setCurrentProduct(product);
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop="30px"
        padding="20px"
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <NoteIcon
          sx={{
            marginRight: 2,
            fontSize: 40,
            color: "#673ab7",
          }}
        />
        <Typography variant="h4" gutterBottom sx={{ color: "#673ab7" }}>
          Notes
        </Typography>
      </Box>
      {editMode ? (
        <Box mb={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentProduct.title}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                description: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProduct}
            sx={{ mt: 2 }}
          >
            Update Note
          </Button>
        </Box>
      ) : (
        <Box mb={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ mt: 2 }}
          >
            Add Note
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        <TransitionGroup component={null}>
          {userProducts.map((product) => (
            <CSSTransition
              key={product._id}
              timeout={500}
              classNames="product-animation"
            >
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    backgroundColor: "#fafafa",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ color: "#673ab7" }}
                    >
                      {product.title}
                    </Typography>
                    <Typography sx={{ color: "#3f51b5" }}>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Grid>
    </Container>
  );
};

export default Products;
