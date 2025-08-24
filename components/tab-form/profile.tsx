'use client';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Store values that trigger debounce validation
  const [debounceValue, setDebounceValue] = useState(formData);

  // Debounce effect: wait 500ms before validating
  useEffect(() => {
    const handler = setTimeout(() => {
      validate(debounceValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [debounceValue]);

  const validate = (data: { name: string; email: string }) => {
    const newErrors: {
      name?: string;
      email?: string;
    } = {
      name: '',
      email: '',
    };

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDebounceValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate(formData); // Final check before submit
    if (Object.keys(errors).length > 0) return;

    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '' }); // reset form
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          User Form
        </h2>

        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* Success message */}
        {submitted && (
          <p className="text-green-600 text-center mt-2">
            ✅ Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
