import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, test, expect, vi } from 'vitest'
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  localStorage.clear();
  global.alert = vi.fn();
});

afterEach(() => {
  cleanup();
});

test("рендерится форма логина", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/\*email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/\*password/i)).toBeInTheDocument();
});

test("показывает ошибку если поля пустые", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'));

  expect(
    screen.getByText(/пожалуйста, заполните все поля/i)
  ).toBeInTheDocument();
});

test("показывает ошибку при неверном email или пароле", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'Неверный email или пароль' })
  });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/\*email/i), "wrong@mail.com");
  await userEvent.type(screen.getByPlaceholderText(/\*password/i), "0000");
  fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'));

  expect(
    await screen.findByText(/неверный email или пароль/i)
  ).toBeInTheDocument();
});

test("успешный вход сохраняет пользователя в localStorage", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, email: 'test@mail.com' })
  });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/\*email/i), "test@mail.com");
  await userEvent.type(screen.getByPlaceholderText(/\*password/i), "1234");
  fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'));

  const savedUser = JSON.parse(await vi.waitFor(() => {
    const val = localStorage.getItem("currentUser");
    if (!val) throw new Error('not saved yet');
    return val;
  }));

  expect(savedUser.email).toBe("test@mail.com");
});