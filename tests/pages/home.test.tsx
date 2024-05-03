
// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'
import Login from '@pages/login';
import App from "../../src/App";
import Home from '../../src/pages/home';
import userEvent from '@testing-library/user-event';

describe('Home Component Test', () => {

  it('Renders correctly initial document', async () => {
    render(
      <Home />
    );
    const loginLabel = screen.getByTestId("home-banner");
    expect(loginLabel).toBeInTheDocument();
  });
  it('Rendering Header and checking if menu is working by navigating to Careers page', async () => {
    render(
      <Home />
    );
    const careers = screen.getByTestId("chip_3")
    expect(careers).toBeInTheDocument();
    userEvent.click(careers);
    await new Promise((r) => setTimeout(r, 2000));
    expect(careers).toHaveStyle("background: rgb(255, 255, 255)")

  });

  it('Signup, entering data into signup modal and clicking on Register to make POST Api call', async () => {
    render(
      <Home />
    );
    const signup = screen.getByText("Sign up");
    expect(signup).toBeInTheDocument();
    userEvent.click(signup);
    await new Promise((r) => setTimeout(r, 1000));


    const email = screen.getByTestId("email_test_id");
    expect(email).toBeInTheDocument();
    await userEvent.type(email, 'john@gmail.com');
    expect(email).toHaveValue('john@gmail.com');


    const password = screen.getByTestId("pwd_test_id");
    expect(password).toBeInTheDocument();
    await userEvent.type(password, 'Pineapple@25');
    expect(password).toHaveValue('Pineapple@25');



    const phone = screen.getByTestId("contact_test_id");
    expect(phone).toBeInTheDocument();
    await userEvent.type(phone, '9999777722');
    expect(phone).toHaveValue('9999777722');


    const registerButton = screen.getByTestId("register_button");
    expect(registerButton).toBeInTheDocument();
    userEvent.click(registerButton);
    // await new Promise(process.nextTick);
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    
  });
});