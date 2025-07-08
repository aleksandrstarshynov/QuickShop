# QuickShop. 
##Release 1

**QuickShop** is an online art store (first release: paintings only) that combines a traditional catalog with upcoming “intelligent” search by image content, mood, and color palette.

## Idea
- Online store with vector search: developed basic functionality for an online store and am integrating Qdrant to search for products by visual and emotional features in order to improve the quality of search and transform the user experience.

## Key Features

- **Product Catalog**  
  Intuitive browsing of paintings with a responsive, masonry-style feed.  
- **Category Search**  
  Filter by painting style (Renaissance, Impressionism, Contemporary, etc.).  
- **Intelligent Search** *(release 2,next)*  
  Semantic search by what’s depicted, emotional impact, and dominant color palette—powered by Qdrant vector embeddings.  
- **Ordering & Delivery**  
  Place orders and arrange deliveries within the Netherlands (release 1–release 2).

## Technologies & Dependencies

- **Frontend**: React, CSS, [react-masonry-css](https://github.com/paulcollett/react-masonry-css)  
- **Backend**: Node.js, Express, Bcrypt, RESTful API  
- **Databases**:  
  - MongoDB (products)  
  - PostgreSQL (users)  
  - Qdrant (release 2, for vector search)  
- **AI / Embeddings**: [SentenceTransformers](https://github.com/UKPLab/sentence-transformers) (model: all-MiniLM-l6-v2)(release 2)
- **Third-Party services**: Stripe, Cloudinary (release 2), PostNL (release 2). 

## Installation & Running Locally

The entire project is in one repository, split into two folders:

```
# 1. 
Clone the repository
git clone https://github.com/aleksandrstarshynov/quickshop.git
# 2.
cd QuickShop

# 3. 
Frontend
cd my-app
npm install
npm start
service will be available locally (default port 3000).

# 4. Backend (in a separate terminal)
cd server
npm install
npm start
service will be available locally ( port 4000).
```

## Production

- Hosted on AWS+Nginxs, EC2 with PM2 process management.
- Production Link: http://51.20.55.140/ (state can be different from GitHub)

## Author

- An individual project by Oleksandr Starshinov, created to practice web development and AI integration skills.
