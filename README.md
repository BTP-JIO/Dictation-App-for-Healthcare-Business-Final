# Dictation-App-for-Healthcare-Business-Final

A full-stack AI-powered dictation app designed for healthcare professionals to transcribe doctor-patient conversations in real-time. It generates structured SOAP notes, medical reports, and PDFs while integrating decision-support features. Built using **React, Spring Boot, MySQL, and DeepSpeech**, the app enhances efficiency, reduces documentation workload, and ensures data security with encryption and compliance measures.  

🚀 **Features:**  
✅ Real-time speech-to-text  
✅ Automated medical documentation  
✅ Secure data storage & encryption  
✅ Customizable keyword recognition  
✅ PDF report generation  

📌 **Tech Stack:** React, Tailwind CSS, Spring Boot, MySQL, DeepSpeech, WebSockets, JWT  

🔗 **Future Scope:** Multi-language support, AI-based analytics, and advanced NLP-driven decision-making.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
curl -X 'POST' \ 'http://10.168.131.232:31460/api/v1/transcription-parser' \ -H 'accept: application/json' \ -H 'Content-Type: application/json' \ -d '{ "transcription_type": "string", "text": "string"}'

http://10.168.131.232:31460/docs
