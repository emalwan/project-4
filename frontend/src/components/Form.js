import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";

export default function ReviewForm() {
  const [review, setReview] = useState("");

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted"); // Replace this with a function to save the review
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Input
          className="review-form"
          type="text"
          placeholder="Enter your review"
          value={review}
          onChange={handleChange}
        />
        <Button type="submit" style={{ background: "Green" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
