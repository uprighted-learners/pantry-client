//import './LoginRegForm.css' - commented out because Sam overrode form syle in her code
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/authSvc';
import {
    Container,
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    Button,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';

export default function LoginRegForm() {
    const navigate = useNavigate();

    const [mode, setMode] = useState("login");

    const [form, setForm] = useState({
        fullName: "",
        zipCode: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";

        if (mode === "register") {
            if (!form.fullName) newErrors.fullName = "Please enter your full name";
            if (!form.zipCode) newErrors.zipCode = "Zip Code required";
            if (!form.email) newErrors.email = "Email address required";
            if (!form.password) newErrors.password = "Please enter "
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
        setForm({
            fullName: "",
            zipCode: "",
            email: "",
            password: ""
        });
        setErrors({});
        setErrorOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) { return; }

        try {
            let response;
            if (mode === "register") {
                response = await registerUser(form);
            } else {
                response = await loginUser({ email: form.email, password: form.password });
            }

            setSuccessOpen(true);
            setErrorMessage("");
            setErrorOpen(false);

            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            if (response.user && response.user.isAdmin) {
                navigate('/admin'); 
            } else {
                console.log("Logged in as non-admin user.");
                navigate('/user-dashboard'); 
            }

            setForm({
                fullName: "",
                zipCode: "",
                email: "",
                password: ""
            });

        } catch (err) {
            setErrorMessage(err.message);
            setErrorOpen(true);
            setSuccessOpen(false);
            console.error("Authentication error:", err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>  
                <FormControl fullWidth error={!!errors.mode} sx={{ mb: 2 }}>
                    <InputLabel id="auth-mode-label">Choose Login or Register</InputLabel>
                    <Select
                        labelId="auth-mode-label"
                        id="auth-mode"
                        label="Choose Login or Register"
                        value={mode}
                        onChange={handleModeChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: 'var(--green)',
                                    input: {
                                        fontFamily: '"mrs-eaves", serif',
                                        backgroundColor: 'var(--purple)',
                                        '::placeholder': {
                                            color: 'var(--grey)',
                                        }
                                    },
                                    width: 'auto',
                                    '& .MuiMenu-list': {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: 'auto',
                                        gap: '1.2rem',
                                        padding: 0
                                    },
                                    '& .MuiMenuItem-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--gold)',
                                            borderWidth:'2px',
                                        },
                                        fontFamily: 'mrs-eaves, serif',
                                        color: 'var(--grey)',
                                        fontSize: '1.5rem',
                                        padding: '10px 16px',
                                        borderBottom: '1px solid var(--gold)',
                                        '&: last-child': {
                                            borderBottom: 'none'
                                        },                                 
                                        '&:hover': {
                                            backgroundColor: '#f3e5f5',
                                            color: 'var(--purple)'
                                        }
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="login">Login</MenuItem>
                        <MenuItem value="register">Register</MenuItem>
                    </Select>
                    {errors.mode && <FormHelperText>{errors.mode}</FormHelperText>}
                </FormControl>

                <form className="loginReg-form" onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <>
                            <TextField
                                label="Full Name"
                                name="fullName"
                                fullWidth
                                value={form.fullName}
                                onChange={handleChange}
                                error={!!errors.fullName}
                                helperText={errors.fullName}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Zip Code"
                                name="zipCode"
                                fullWidth
                                value={form.zipCode}
                                onChange={handleChange}
                                error={!!errors.zipCode}
                                helperText={errors.zipCode}
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ mb: 3 }}
                    />

                    <Button   variant="contained"
  type="submit"
  fullWidth
  sx={{
    backgroundColor: 'var(--purple)',
    border: '2px solid var(--gold)',
    color: 'white',
    fontFamily: '"mrs-eaves", serif',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#FFB823',
      color: 'var(--black)',
    }
  }}
>
                        {mode === 'login' ? 'Login' : 'Register'}
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={successOpen}
                autoHideDuration={4000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ top: '30% !important' }}
            >
                <Alert
                    onClose={() => setSuccessOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{
                        bgcolor: 'var(--purple)',
                        color: 'var(--gold)',
                        fontFamily: 'mrs-eaves, serif',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        borderRadius: 2
                    }}
                >
                    {mode === 'login' ? 'Login Successful!' : 'Registration Successful!'}
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ top: '30% !important' }}
            >
                <Alert
                    onClose={() => setErrorOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{
                        bgcolor: 'error.dark',
                        color: 'white',
                        fontFamily: 'mrs-eaves, serif',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        borderRadius: 2
                    }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}





// routes for admin and user "/admin/dashboard" "/user/dashboard"