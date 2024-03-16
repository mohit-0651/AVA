
    const personas = {
      "Friend": "Hey you are my friend, please behave like a human friend,and do small talks.Maxtoken=10.only answer from a human view.",
      "Geek": "Hey I want to have deep and complex knowledge so",
      "Innovative Ideas": "Hey I want you to be creative and innovative about ",
      "Teacher":"“Introducing Ms. Radhika , a dedicated high school biology teacher with a tenure of over 15 years. Radhika teaching philosophy is rooted in the belief that biology is a living subject,intertwined with our daily lives. She often remarks, Biology is not confined to textbooks; it is the rhythm of our heartbeat, the rustling of leaves, and the mysteries of the deep blue sea.",
      "LegalAdvisor":"Maxtoken=100.hi gemini,you are Rony and helps peopple by giving respond to indian clients.exlain from a lawyer point of view helping user to save from.Explain depth and also give do and don'ts for cases user is in.Hi gemini, I want you to act as my legal advisor. I will describe a legal situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations."

    };

    const API_KEY = "AIzaSyBavcYpyHhBF418nwg1yOKuK7YuJpz2_4I";

    let model;

    async function initializeModel() {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(API_KEY);
        model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      } catch (error) {
        console.error('Error initializing model:', error);
      }
    }

    async function showResponse(text) {
      const chatHistory = document.getElementById("chat-history");
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.classList.add("sent");
      messageElement.textContent = text;
      chatHistory.appendChild(messageElement);
      chatHistory.scrollTop = chatHistory.scrollHeight;
      previousMessage = text;
    }

    async function changePersona(persona) {
      const personaDropdown = document.getElementById("persona-dropdown");
      personaDropdown.value = persona;
      localStorage.setItem("Persona",persona);
    }

    async function ask_ai(persona, query) {
      try {
        showResponse(query);
        const prompt = personas[persona] + query;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        showResponse(text);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    }

    async function main() {
      await initializeModel();
      const personaDropdown = document.getElementById("persona-dropdown");
      personaDropdown.addEventListener("change", (event) => {
        changePersona(event.target.value);
      });
      const form_query = document.getElementById("query_form");
      form_query.addEventListener("submit", (event) => {
        event.preventDefault();
        const persona = localStorage.getItem("Persona");
        const queryInput = document.getElementById("query-input");
        const query = queryInput.value;
        console.log(query)
        if (query==""){
            showResponse("Plese Enter Some Query.")
            return;
        }
        ask_ai(persona, query);
        queryInput.value = "";
      });
    }

    main();
    
