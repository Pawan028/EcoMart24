import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Meta from '../components/Meta';

const WishlistScreen = () => {
    // For now, using localStorage for wishlist (can integrate with backend later)
    const [wishlistItems, setWishlistItems] = React.useState([]);

    React.useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlistItems(JSON.parse(savedWishlist));
        }
    }, []);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <>
            <Meta title="My Wishlist - EcoMart" />
            <Container className="py-5">
                {/* Header */}
                <div className="mb-4">
                    <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4 transition-colors">
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-3 mt-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                            <FaHeart className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="text-gray-600">
                                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wishlist Items */}
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h3>
                        <p className="text-gray-500 mb-6">Start adding products you love!</p>
                        <Link
                            to="/"
                            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <Row>
                        {wishlistItems.map((item) => (
                            <Col key={item._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                                <Card className="h-100 shadow-sm hover:shadow-lg transition-shadow">
                                    <Link to={`/product/${item._id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={item.image}
                                            alt={item.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/product/${item._id}`} className="text-decoration-none">
                                            <Card.Title className="text-gray-900 line-clamp-2 mb-2">
                                                {item.name}
                                            </Card.Title>
                                        </Link>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl font-bold text-primary-600">
                                                ₹{item.price}
                                            </span>
                                            {item.rating && (
                                                <span className="text-sm text-gray-600">
                                                    ⭐ {item.rating}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeFromWishlist(item._id)}
                                                className="flex-1"
                                            >
                                                <FaTrash className="me-2" />
                                                Remove
                                            </Button>
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="btn btn-primary btn-sm flex-1 text-center"
                                            >
                                                <FaShoppingCart className="me-2" />
                                                View
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
};

export default WishlistScreen;
