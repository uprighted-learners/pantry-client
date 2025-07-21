// !This will go inside the user dashboard

import { useState } from 'react';
import { submitGetInvolved } from '../../services/getInvolvedSvc';
import './FormGetInvolved.css';
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
    Alert 
} from '@mui/material';

// a list of reasons for the dropdown (select) in the form
const reasons = [
    "I need help", 
    "I want to volunteer", 
    "Suggest new pantry", 
    "Update current pantry", 
    "Other"
];

export default function FormGetInvolved() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
        typeOfInquiry: "" // a dropdown menu
    });

    const [errors, setErrors] = useState({});

    const [successOpen, setSuccessOpen] = useState(false);

    // field validation ensures that the required fields are filled out before submitting
    const validate = () => {
        const newErrors = {};
        if (!form.fullName) newErrors.fullName = "Please enter your full name.";
        if (!form.email) newErrors.email = "Email is required";
        if (form.phoneNumber && !/^\d{10}$/.test(form.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits, no spaces or symbols";
        if (!form.message) newErrors.message = "Please enter a message, so we know how best to assist you.";
        if (!form.typeOfInquiry) newErrors.typeOfInquiry = "Please select a reason";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handles the updates made to just the fields that are actually changed. In our app, this form is for new messages/submissions, and all fields, but one, are required. Still, this will handle each field as it changes from "" to having data.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // handles what happens when the form is submitted by user
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        
        if (!isValid) {
            return;
        }

        try {
          console.log("Submitting form:", form); 
          await submitGetInvolved(form);
          setSuccessOpen(true);
          
          // resets form only if valid submission
          setForm({
            fullName: "",
            email: "",
            phoneNumber: "",
            message: "",
            typeOfInquiry: "",
          });
        
          // resets errors only after valid submission
          setErrors({});
    
        } catch (err) {
          console.error("Error submitting to backend:", err);
        }
    };

    console.log("Component Render - Current errors state:", errors);
    console.log("Component Render - errors.fullName:", errors.fullName);

  return (
    <Container maxWidth="sm">
        <Paper sx={{ p: 3}}>
            <form className="form-get-involved" onSubmit={handleSubmit}>
                <FormControl fullWidth error={!!errors.typeOfInquiry} sx={{ mb: 2 }}>
                    <InputLabel id="typeOfInquiry-label">Select Reason</InputLabel>
                    <Select
                        labelId="typeOfInquiry-label"
                        id="typeOfInquiry"
                        label="Select Reason" 
                        name="typeOfInquiry" 
                        value={form.typeOfInquiry} 
                        onChange={handleChange}
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
                        {reasons.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </Select>
                    {errors.typeOfInquiry && <FormHelperText>{errors.typeOfInquiry}</FormHelperText>}
                </FormControl>

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

                <TextField l
                    abel="Email" 
                    name="email" 
                    fullWidth 
                    value={form.email} 
                    onChange={handleChange} 
                    error={!!errors.email}
                    helperText={errors.email} 
                    sx={{ mb: 2 }} 
                />

                <TextField 
                    label="Phone Number" 
                    name="phoneNumber" 
                    fullWidth 
                    value={form.phoneNumber} 
                    onChange={handleChange} 
                    inputProps={{ pattern: "\\d{10}" }} 
                    error={!!errors.phoneNumber} 
                    helperText={errors.phoneNumber} 
                    sx={{ mb: 2 }} 
                />

                <TextField 
                    label="Message" 
                    name="message" 
                    multiline 
                    rows={5} 
                    fullWidth 
                    value={form.message} 
                    onChange={handleChange} 
                    error={!!errors.message} 
                    helperText={errors.message} 
                    sx={{ mb: 2 }} 
                />

                <Button variant="contained" type="submit">Send</Button>
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
                    fontSize: '2rem',
                    borderRadius: 2
                    }}
            >
                Your message was sent! 
                Someone will contact you within 48 hours.
            </Alert>
        </Snackbar>
    </Container>
  );
}