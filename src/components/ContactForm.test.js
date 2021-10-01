import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const formHeader = screen.getByText(/contact form/i);
    expect(formHeader).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/);
    userEvent.type(firstNameInput, "sora");
    const firstNameError = screen.getByTestId("error");
    expect(firstNameError).toBeInTheDocument();
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorDisplays = screen.getAllByTestId("error")
    expect(errorDisplays.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    const submitButton = screen.getByRole("button");

    userEvent.type(firstNameInput, "Drake");
    userEvent.type(lastNameInput, "Shallown");
    userEvent.click(submitButton);

    const errorDisplays = screen.getAllByTestId("error");
    expect(errorDisplays.length).toBe(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, "jackjackdede@asd");

    const emailInputError = screen.getByText(/email must be a valid email address/i, {exact: false});
    expect(emailInputError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole("button");

    userEvent.type(firstNameInput, "Drake");
    userEvent.type(emailInput, "jackjackdede@asd.com");
    userEvent.click(submitButton);

    const lastNameError = screen.getByText(/lastName is a required field/i, {exact: false});
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole("button");

    userEvent.type(firstNameInput, "Drake");
    userEvent.type(lastNameInput, "samanhthaha")
    userEvent.type(emailInput, "jackjackdede@asd.com");
    userEvent.click(submitButton);

    const submittedFields = screen.getAllByTestId(/Display/, {exact:false});
    expect(submittedFields.length).toBe(3);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i)
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole("button");

    userEvent.type(firstNameInput, "Drake");
    userEvent.type(lastNameInput, "samanhthaha")
    userEvent.type(emailInput, "jackjackdede@asd.com");
    userEvent.type(messageInput, "giv me soem");
    userEvent.click(submitButton);

    const submittedFields = screen.getAllByTestId(/Display/, {exact:false});
    expect(submittedFields.length).toBe(4);
});