/* eslint-disable no-unused-vars */
import React from "react";

const FrontPage = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{textAlign:"center"}}>Welcome to Stock Management</h1>
        <h3 className="text-lg text-gray-600" style={{textAlign:"center"}}>Manage your stocks efficiently</h3>
        <img src='https://softwareforbilling.files.wordpress.com/2019/03/inventory-banner.jpg' alt="Inventory Banner" style={{width:'100%'}} />
        <div className="mt-8">
          {/* Add your additional components or content here */}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
