
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <style>
      {`
        .lesson-content {
          line-height: 1.6;
        }
        .lesson-content h1, .lesson-content h2, .lesson-content h3 {
          color: #495057;
          margin-bottom: 1rem;
        }
        .lesson-content p {
          margin-bottom: 1rem;
        }
        .card-header.bg-gradient {
          border: none !important;
        }
        .list-group-item.active {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        .nav-pills .nav-link.active {
          background-color: #0d6efd;
        }
      `}
    </style>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
