# Event Logging System

## Overview

The **Event Logging System** is a scalable backend application built using Node.js and MongoDB. It provides a decentralized, tamper-proof event logging platform for distributed applications. It supports robust querying, real-time updates, and tamper-proof storage mechanisms, inspired by blockchain concepts.

---

## Features

1. **Event Logging API**:
   - RESTful API for receiving and storing event logs.
   - Each event contains:
     - **Event Type**: The type/category of the event.
     - **Timestamp**: The time the event was logged.
     - **Source Application ID**: Identifier of the source application.
     - **Data Payload**: JSON object containing event-specific details.

2. **Tamper-Proof Design**:
   - Uses cryptographic hashing to link event logs, forming a lightweight blockchain.
   - Each log references the hash of the previous log to ensure integrity.

3. **Search and Query**:
   - Query events by:
     - **Timestamp range**.
     - **Event type**.
     - **Source application**.
   - Pagination support for large datasets.

4. **Real-Time Updates (Bonus)**:
   - Optional support for WebSocket-based real-time log streaming.

5. **Horizontal Scalability**:
   - Designed to handle high traffic with proper indexing and load balancing.

---

## Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Installed locally or use MongoDB Atlas (cloud)
- **npm**: Installed with Node.js
- **Postman** (or any API testing tool)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Pavithrabalakumaran/event-logging-system.git
   cd event logging system
   