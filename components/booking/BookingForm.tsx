// components/booking/BookingForm.tsx
import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const BookingForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const simpleValidate = () => {
    if (!form.firstName || !form.lastName) return "Please enter full name.";
    if (!form.email.includes("@")) return "Please enter a valid email.";
    if (form.cardNumber.length < 12) return "Enter a valid card number (test).";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = simpleValidate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    try {
      // Placeholder: here you would call your backend to create a payment intent
      // and confirm payment via Stripe/PayPal SDK, etc.
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess("Payment simulated — booking confirmed!");
      setForm(initialState);
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Details</h2>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input name="firstName" value={form.firstName} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input name="lastName" value={form.lastName} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label className="block text-sm">Phone Number</label>
            <input name="phone" value={form.phone} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-4">Pay with</h3>
        <div>
          <label className="block text-sm">Card Number</label>
          <input name="cardNumber" value={form.cardNumber} onChange={onChange}
            className="border p-2 w-full mt-2 rounded" placeholder="4242 4242 4242 4242 (test)" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Expiration Date</label>
            <input name="expiry" value={form.expiry} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" placeholder="MM/YY" />
          </div>
          <div>
            <label className="block text-sm">CVV</label>
            <input name="cvv" value={form.cvv} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" placeholder="123" />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-4">Billing Address</h3>
        <div>
          <label className="block text-sm">Street Address</label>
          <input name="street" value={form.street} onChange={onChange}
            className="border p-2 w-full mt-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Apt / Suite</label>
          <input name="apt" value={form.apt} onChange={onChange}
            className="border p-2 w-full mt-2 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm">City</label>
            <input name="city" value={form.city} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label className="block text-sm">State</label>
            <input name="state" value={form.state} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
          <div>
            <label className="block text-sm">Zip Code</label>
            <input name="zip" value={form.zip} onChange={onChange}
              className="border p-2 w-full mt-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm">Country</label>
          <input name="country" value={form.country} onChange={onChange}
            className="border p-2 w-full mt-2 rounded" />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button disabled={submitting}
          type="submit"
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md w-full disabled:opacity-60">
          {submitting ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
