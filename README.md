# Vehicle Detection System (VDS)

The **Vehicle Detection System (VDS)** is a two-part application that manages vehicle detection and access control for parking lot entrances and exits.

It includes:

1. **Machine Learning (ML) Component**  
   Detects vehicles in video feeds, extracts details, and stores them in a database.
2. **User Interface (UI) Component**  
   A Next.js-based frontend that handles user authentication, vehicle registration, and viewing detection records.

---

## 🚀 Features

### ML Component

- Real-time vehicle detection from live or pre-recorded video.
- Extracted vehicle details:
    - **Make & Model**
    - **Color**
    - **Number Plate**
- Integration with Supabase for storing detection records.
- Automatic barrier control:
    - **Registered vehicles**: Barrier lifts.
    - **Unregistered vehicles**: Access denied.
- Built using:
    - **Ultralytics** – YOLO Library
    - **OpenCV** – Vehicle Extraction
    - **PyTorch** – Training Machine Learning Models

### UI Component

- User sign-up and login.
- Vehicle registration.
- Viewing detection history.
- Built using:
    - **Next.js** – Server-side rendering
    - **React.js** – Dynamic frontend
    - **TailwindCSS** – Styling
    - **Prisma** – Database ORM

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed
- Python 3.8+
- Supabase account and project
- `.env` files for both components

---

### 🔧 ML Component Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**

   Create a `.env` file in the ML directory:
    ```bash
    SUPABASE_URL=<Your Supabase URL>
    SUPABASE_KEY=<Your Supabase API Key>
    ```

3. **Run the ML Component**
    ```bash
    python vehicle_extraction.py
    ```

---

### 🖥️ UI Component Setup

1. **Install Dependencies**
   ```bash
    npm install
    ```

2. **Environment Variables**

   Create a `.env` file in the UI directory:
   ```bash
    NEXT_PUBLIC_SUPABASE_URL=<Your Supabase URL>
    NEXT_PUBLIC_SUPABASE_KEY=<Your Supabase API Key>
    DATABASE_URL=<Your Supabase Database URL>
    DIRECT_URL=<Your Supabase Database Direct URL>
    ```

3. **Set Up the Database**
   ```bash
    npx prisma db push
    ```

4. **Build the UI Component**
   ```bash
    npm run build
    ```

5. **Run the UI Component**
   ```bash
    npm start
    ```

---

## 🔍 How It Works

- The ML component detects and identifies vehicles from video streams and stores this data in Supabase.

- The UI allows users to register and associate vehicles with their accounts.

- When a vehicle is detected:

    - If registered, the barrier opens.

    - If not, access is denied.

## 👤 Author

Developed by **Syed Muhammad Khizer**
