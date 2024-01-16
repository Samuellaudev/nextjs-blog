'use client';

import { SEND_URL } from '@/utils/constants';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import styles from './contactStyle.module.css';
import { socialLinks } from '@/utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const connectMessage =
    "I'm actively seeking new opportunities and would love to connect with you. Feel free to drop me a message, whether you have a question or just want to say hello!";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, subject, message } = formData;

      const response = await axios.post(`${SEND_URL}`, {
        email,
        subject,
        message,
      });

      if (response.status === 200) {
        toast.success('Email sent successfully');
        setFormData({
          email: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="container mx-auto px-12 md:mt-20 grid md:grid-cols-2 gap-4 text-[#565b5f] dark:text-white"
    >
      {/* Social Area */}
      <div className="social-area">
        <h2
          className={`font-bold dark:text-white text-[#ADB7BE] ${styles.contact__heading}`}
        >
          Let&apos;s Connect
        </h2>
        <p className="dark:text-white mb-4 max-w-md">{connectMessage}</p>
        <div className="socials-icon flex flex-row gap-2 space-x-6">
          {socialLinks.map((link, index) => (
            <a href={link.href} key={index} target="_blank">
              <Image
                src={link.src}
                alt={link.alt}
                width={30}
                height={30}
                className="duration-200 hover:invert-0 hover:sepia-0 hover:saturate-2 hover:hue-rotate-[184deg] hover:brightness-[110%] hover:contrast-[101%]"
              />
            </a>
          ))}
        </div>
      </div>
      {/* Form Area */}
      <div
        className={`form-area relative lg:mb-0 ${styles.form_top_spacing} ${
          isLoading ? 'mb-96' : ''
        }`}
      >
        {isLoading ? (
          <ArrowPathIcon className="absolute h-10 w-10 text-[#ADB7BE] dark:text-white animate-spin-slow inset-y-32 inset-x-36" />
        ) : (
          <form className="flex flex-col mb-14" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className=" block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className={`${styles.light_theme_form} dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
                placeholder="sample@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className=" block mb-2 text-sm font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className={`${styles.light_theme_form} dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
                placeholder="Just saying hi"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className=" block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className={`${styles.light_theme_form} dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
                placeholder="Let's talk about..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={`${styles.light_theme_btn} darK:bg-primary-600`}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
