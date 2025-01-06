# Social Media Content Performance Analyzer

## Problem it Solves 🙅‍♂️
In today's digital age, social media platforms generate massive amounts of data from user interactions, such as likes, comments, and shares on posts. Businesses and content creators struggle to analyze this data to understand which types of posts perform best (e.g., carousels, reels, static images). This analysis is essential for optimizing content strategies and improving audience engagement. However, manually analyzing this data is time-consuming and error-prone.

**What if there were a way to automate this process, quickly extract insights, and store the data in a scalable database?**

This project solves that problem by leveraging advanced tools and technologies to:
- Automatically analyze social media data.
- Identify performance trends based on post type.
- Store insights in a scalable and efficient manner.

## Challenges I Ran Into 🙅‍♂️
While building this project, I faced several challenges:

1. **Understanding Vector Embeddings:**
   Vector embeddings were a completely new concept for me. Despite using Langflow, a no-code tool, I had to spend significant time exploring and configuring its components to achieve the desired functionality.

2. **Model Compatibility Issues:**
   Embedding models such as Google and Cohere occasionally did not function as expected. I had to switch between models frequently to find one that worked, which added to the learning curve.

3. **Complexity in Configuration:**
   Setting up Langflow components and ensuring compatibility with other tools required significant trial and error, making the process more time-intensive than anticipated.

## Tech Stack 🛠️
The following technologies and tools were used in this project:

1. **Langflow:**
   - Used to create a flow and generate the underlying code for automating data processing and analysis.

2. **DataStax Astra DB:**
   - A scalable, cloud-native database for storing vector embeddings and ensuring efficient data retrieval.

3. **Gemini AI and GROQ AI:**
   - Leveraged for embedding generation and processing social media data to extract meaningful insights.

## Key Features ✨
- **Automated Data Analysis:**
  Automatically analyzes social media content performance across different post types.

- **Scalable Storage:**
  Stores vector embeddings in a scalable database, ensuring smooth data retrieval even as the dataset grows.

- **Optimized Content Strategy:**
  Provides insights into which types of posts (e.g., carousels, reels, static images) perform best, helping content creators optimize their strategy.

## How to Run the Project 🚀
1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Install required dependencies:
   ```bash
    pnpm install
   ```

3. Set up environment variables for:
   - Langflow API
   - DataStax Astra DB credentials
   - Gemini AI and GROQ AI 
   - Vanilla js

4. Run the project:
   ```bash
   node server.js
   ```

5. Access the application at `http://localhost:3000` (or the specified port).


