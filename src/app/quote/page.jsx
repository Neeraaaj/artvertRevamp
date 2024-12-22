'use client'

import React from 'react';
import '../globals.css';
import axios from 'axios';
import Image from 'next/image';

export default function Page() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('inside the handleSubmit')
        console.log(event);
        console.log(event.target);

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        // Send email using Resend API to a fixed recipient
        try {
            await axios.post(
                'http://localhost:5000/send-email',
                {
                    from: 'onboarding@resend.dev',  // Replace with your verified email
                    to: 'patilneeraj2003@gmail.com', // Replace with the fixed recipient's email
                    subject: 'New Mural Quotation Request',
                    html: `
                        <h2>Mural Quotation Request Details</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Project Type:</strong> ${data.project_type}</p>
                        <p><strong>Mural Type:</strong> ${data.mural_type}</p>
                        <p><strong>Number of Walls:</strong> ${data.number_of_walls}</p>
                        <p><strong>Maximum Budget:</strong> ${data.max_budget}</p>
                        <p><strong>Project Details:</strong> ${data.project_details}</p>
                        <p><strong>Contact Number:</strong> ${data.contact_number}</p>
                        <p>...other details...</p>
                    `,
                },
                {
                    headers: {
                        Authorization: `Bearer re_2hBJK6Zm_DNit8r9uSVdmWGezR7YpVbV`,  
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Email sent successfully!');
        } catch (error) {
            console.log(error);
            alert('Error sending email:', error);
            return;
        }

        // Generate Excel file
        const ws = XLSX.utils.json_to_sheet([data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Quotations');
        XLSX.writeFile(wb, 'Quotations.xlsx');

        alert('Excel file generated successfully!');
    };

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://cdn.dribbble.com/userupload/17006634/file/original-76e229cc533b0031fd1ebff14d8a27a4.jpg?resize=1200x900"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="#">
                            <span className="sr-only">Home</span>
                            <Image src={"/images/Logo1.png"} width={100} height={100} />
                        </a>

                        <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                            Mural Quotation Form
                        </h1>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6"  onSubmit={(e) => handleSubmit(e)}>
                            {/* Mural Type Selection */}
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700">What kind of mural are you looking for?</label>
                                <select className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2" name="mural_type">
                                    <option value="internal">Internal Mural</option>
                                    <option value="external">External Mural</option>
                                </select>
                            </div>

                            {/* Project Type Selection */}
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Project Type</label>
                                <select className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" name="project_type">
                                    <option value="commercial">Commercial</option>
                                    <option value="residential">Residential</option>
                                </select>
                            </div>

                            {/* Number of Walls Selection */}
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700">How many walls would you like the mural to cover?</label>
                                <select className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" name="number_of_walls">
                                    <option value="1">1 Wall</option>
                                    <option value="2">2 Walls</option>
                                    <option value="3">3 Walls</option>
                                    <option value="entire_room">Entire Room</option>
                                </select>
                            </div>

                            {/* Image Upload */}
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Attach Reference Images</label>
                                <input type="file" accept="image/*" multiple className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
                                <p className="mt-2 text-sm text-gray-500">Please upload any reference images you have including images of the walls, design ideas, floor plan (wall sizes), and anything else to help us with your project.</p>
                            </div>

                            {/* Maximum Budget */}
                            <div className="col-span-6">
                                <label htmlFor="max_budget" className="block text-sm font-medium text-gray-700">What is your maximum budget?</label>
                                <input
                                    type="text"
                                    id="max_budget"
                                    name="max_budget"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="col-span-6">
                                <label htmlFor="project_details" className="block text-sm font-medium text-gray-700">Project Details</label>
                                <textarea
                                    id="project_details"
                                    name="project_details"
                                    rows="4"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                    placeholder="Describe your ideas for the project, including your location, ideal color scheme, and completion timeline."
                                ></textarea>
                            </div>

                            {/* Contact Information */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name (optional)</label>
                                <input
                                    type="text"
                                    id="company_name"
                                    name="company_name"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input
                                    type="tel"
                                    id="contact_number"
                                    name="contact_number"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    className="mt-1 w-full rounded-md border bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Submit Quotation
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
}
