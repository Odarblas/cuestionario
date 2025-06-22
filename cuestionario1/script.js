document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const registrationContainer = document.getElementById('registration-container');
    const quizContainer = document.getElementById('quiz-container');
    const registrationForm = document.getElementById('registration-form');
    const quizForm = document.getElementById('quiz-form');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const resultsContainer = document.getElementById('results-container');
    const scoreDisplay = document.getElementById('score-display');
    const restartBtn = document.getElementById('restart-btn');

    // Datos del usuario
    let userData = {
        name: '',
        email: ''
    };

    // Variables del cuestionario
    let currentSection = 0;
    const questionsPerSection = 5;
    let userAnswers = [];

    // Datos del cuestionario (5 secciones completas)
    const quizData = [
        // Sección 1 (índice 0) - Preguntas 1-5
        [
            {
                question: "1. ¿Qué atributo HTML asegura que 'Sunset Logo' se lea en voz alta si la imagen no carga?",
                options: [
                    '<img src="sunset.png" title="Sunset Logo">',
                    '<img src="sunset.png" alt="Sunset Logo">',
                    '<img src="sunset.png" aria-label="Sunset Logo">',
                    '<img src="sunset.png" onerror="speak()">'
                ],
                correct: 1
            },
            {
                question: "2. Relaciona las etiquetas semánticas HTML con su finalidad correcta para un blog:",
                options: [
                    "<article> → Muestra una entrada del blog | <section> → Muestra comentarios | <nav> → Hipervínculos externos",
                    "<article> → Muestra una entrada del blog | <aside> → Muestra comentarios | <nav> → Hipervínculos externos",
                    "<section> → Muestra una entrada del blog | <div> → Muestra comentarios | <footer> → Hipervínculos externos",
                    "<main> → Muestra una entrada del blog | <article> → Muestra comentarios | <a> → Hipervínculos externos"
                ],
                correct: 1
            },
            {
                question: "3. Quiere aplicar un estilo a todos los elementos del documento. ¿Qué selector de tipos debe usar?",
                options: ["div", "*", "body", "#id"],
                correct: 1,
                dynamic: true,
                init: function(container) {
                    const questionDiv = document.createElement("div");
                    questionDiv.innerHTML = `
                        <p><strong>Instrucción:</strong> Selecciona el selector que aplica estilos a <u>todos</u> los elementos:</p>
                        <div class="options"></div>
                        <div id="feedback" style="margin-top: 15px;"></div>
                    `;
                    container.appendChild(questionDiv);

                    const optionsDiv = questionDiv.querySelector(".options");
                    this.options.forEach((opt, index) => {
                        const button = document.createElement("button");
                        button.innerHTML = `${String.fromCharCode(65 + index)}) <code>${opt}</code>`;
                        button.onclick = () => this.checkAnswer(index, questionDiv);
                        optionsDiv.appendChild(button);
                    });
                },
                checkAnswer: function(selectedIndex, container) {
                    const feedback = container.querySelector("#feedback");
                    if (selectedIndex === this.correct) {
                        feedback.innerHTML = '<p style="color: green;">✅ Correcto! El selector universal <code>*</code> aplica estilos globales.</p>';
                        container.querySelectorAll("*").forEach(el => {
                            el.style.color = "blue";
                        });
                    } else {
                        feedback.innerHTML = `<p style="color: red;">❌ Incorrecto. La opción correcta es <code>${this.options[this.correct]}</code>.</p>`;
                    }
                }
            },
            {
                question: "4. Complete las pseudoclases de los elementos de vínculo para que: 1) Aparezcan en rojo (red) al cargar, 2) Verde (green) al activar/pasar el ratón, 3) Azul (blue) si ya se visitó.",
                type: "css-pseudo-classes",
                options: {
                    leftItems: [
                        { id: "link", text: "a:link" },
                        { id: "visited", text: "a:visited" },
                        { id: "hover", text: "a:hover" },
                        { id: "active", text: "a:active" }
                    ],
                    rightSlots: [
                        { id: "normal", text: "Color al cargar (red)", correct: "link" },
                        { id: "interaction", text: "Color al interactuar (green)", correct: ["hover", "active"] },
                        { id: "clicked", text: "Color visitado (blue)", correct: "visited" }
                    ]
                },
                explanation: "El orden correcto es: a:link (sin visitar), a:visited (visitado), a:hover (ratón encima), a:active (al hacer clic)."
            },
            {
                question: "5. Complete el código HTML para que la imagen clients.gif enlace a clients.html en nueva ventana:",
                type: "code-selection",
                codeQuestion: {
                    template: "<a [1]>\n  <img [2] />\n</a>",
                    options: [
                        {
                            placeholder: "[1]",
                            choices: [
                                'href="clients.html" target="_blank"',
                                'src="clients.html" target="_blank"',
                                'link="clients.html" new-window',
                                'url="clients.html" blank'
                            ],
                            correct: 0
                        },
                        {
                            placeholder: "[2]",
                            choices: [
                                'src="clients.gif" alt="Clients image"',
                                'img="clients.gif" description="Clients"',
                                'source="clients.gif" text="Clients"',
                                'file="clients.gif" title="Clients"'
                            ],
                            correct: 0
                        }
                    ]
                }
            }
        ],
        // Sección 2 (índice 1) - Preguntas 6-10
        [
            {
                question: "6. Mueva cada término de CSS desde la lista de la izquierda hasta el ejemplo de la derecha que corresponda.",
                type: "css-terms-dragdrop",
                options: {
                    terms: [
                        { id: "value", text: "valor" },
                        { id: "property", text: "propiedad" },
                        { id: "declaration", text: "declaración" },
                        { id: "class-selector", text: "selector de clases" }
                    ],
                    examples: [
                        { 
                            id: "example1", 
                            code: ".mi-clase { }",
                            correct: "class-selector",
                            explanation: "Los selectores de clase comienzan con punto (.)"
                        },
                        { 
                            id: "example2", 
                            code: "color: red;",
                            correct: "declaration",
                            explanation: "Una declaración completa incluye propiedad y valor"
                        },
                        { 
                            id: "example3", 
                            code: "font-size",
                            correct: "property",
                            explanation: "La propiedad es lo que queremos modificar"
                        },
                        { 
                            id: "example4", 
                            code: "24px",
                            correct: "value",
                            explanation: "El valor es la especificación concreta"
                        }
                    ]
                },
                explanation: "En CSS: selector (qué elementos), propiedad (qué cambiar), valor (cómo cambiarlo), declaración (propiedad + valor)."
            },
            {
                question: "7. Analiza el siguiente código HTML/CSS. ¿Cuál es el principal problema de acuerdo a las mejores prácticas?",
                code: `<body>
                    <h1 style="color: navy">Learning CSS</h1>
                    <ul>
                    <li style="color: blue">Inline Styles</li>
                    <li style="color: blue">Internal Styles</li>
                    <li style="color: blue">External Styles</li>
                    </ul>
                    </body>`,
                options: [
                    "El uso de <ul> para listas es semánticamente incorrecto",
                    "Los colores usados no tienen suficiente contraste",
                    "El uso excesivo de estilos en línea dificulta el mantenimiento",
                    "Falta la etiqueta <DOCTYPE html> al inicio del documento"
                ],
                correct: 2
            },
            {
                question: "8. Analiza el siguiente código HTML y selecciona la afirmación verdadera:",
                type: "code-multiple-choice",
                code: `<body>
                    <h1 style="color: navy">Learning CSS</h1>
                    <ul>
                    <li style="color: blue">Inline Styles</li>
                    <li style="color: blue">Internal Styles</li>
                    <li style="color: blue">External Styles</li>
                    </ul>
                    </body>`,
                options: [
                    "El estilo de color para el elemento <h1> debe moverse a una hoja de estilos interna",
                    "El código actual sigue las mejores prácticas del sector",
                    "Los estilos en línea para los elementos <li> deben moverse a una hoja de estilos",
                    "Los estilos de los elementos <li> deben transferirse al elemento <body>"
                ],
                correct: 2
            },
            {
                question: "9. ¿Qué dos eventos se admiten en dispositivos táctiles? (Elija 2 respuestas)",
                type: "touch-events-multiple",
                options: [
                    { text: "A. Selection", correct: false },
                    { text: "B. Click", correct: true },
                    { text: "C. Drag", correct: false },
                    { text: "D. Touchstart", correct: true }
                ]
            },
            {
                question: "10. ¿Cual es el valor predeterminado de la propiedad \"position\" de CSS?",
                options: ["relative", "absolute", "fixed", "static"],
                correct: 3
            }
        ],
        // Sección 3 (índice 2) - Preguntas 11-15
        [
            {
                question: "11. Complete el código HTML seleccionando la opción correcta de cada lista desplegable:",
                type: "dropdown-completion",
                code: `<fieldset>
                <legend>Fundraising Campaign</legend>
                <label for="donate" class="label">Monthly Donations :</label>
                <[1] id="donate" value="15" min="0" max="50"></[1]>
                <label for="amount" class="label">Choose your donation amount:</label>
                <input list="amount" name="amount" id="amount">
                <datalist id="amount">
                    <[2] value="10">
                    <[2] value="20">
                    <[2] value="30">
                </datalist>`,
                options: [
                    {
                        placeholder: "[1]",
                        choices: ['meter', 'progress', 'range', 'input'],
                        correct: 0
                    },
                    {
                        placeholder: "[2]",
                        choices: ['option', 'item', 'choice', 'select'],
                        correct: 0
                    }
                ],
                explanation: "Respuestas correctas:\n1. 'meter' - Elemento para mostrar medidas escalares\n2. 'option' - Elemento para opciones dentro de datalist"
            },
            {
                question: "12. Complete el estilo CSS para un párrafo con doble interlineado y 5px entre letras:",
                type: "code-selection",
                codeQuestion: {
                    template: `<style>\n    p {\n        [1]: [2];\n        [3]: [4];\n    }\n</style>`,
                    options: [
                        {
                            placeholder: "[1]",
                            choices: ['line-height', 'letter-spacing', 'word-spacing', 'text-space'],
                            correct: 0
                        },
                        {
                            placeholder: "[2]",
                            choices: ['1em', '2em', '5px', 'double'],
                            correct: 1
                        },
                        {
                            placeholder: "[3]",
                            choices: ['character-gap', 'letter-spacing', 'text-spacing', 'word-gap'],
                            correct: 1
                        },
                        {
                            placeholder: "[4]",
                            choices: ['2em', '5px', '10px', 'normal'],
                            correct: 1
                        }
                    ]
                },
                explanation: `La solución correcta es:<br>
                <strong>line-height: 2em;</strong> → Para doble espacio entre líneas<br>
                <strong>letter-spacing: 5px;</strong> → Para espacio entre caracteres`
            },
            {
                question: "13. El equipo de desarrollo acaba de lanzar una nueva versión de la aplicación para que pruebe su equipo. ¿Qué tareas debe realizar durante las pruebas?",
                type: "qa-testing-dragdrop",
                tasks: [
                    { id: "funcionalidad", text: "Comprobar la funcionalidad de la aplicación" },
                    { id: "defectos", text: "Encontrar defectos en la aplicación" },
                    { id: "especificaciones", text: "Asegurarse de que cumpla las especificaciones" },
                    { id: "produccion", text: "Implementar la aplicación en producción" },
                    { id: "caracteristicas", text: "Pedir solicitudes de características" }
                ],
                correctAnswers: ["funcionalidad", "defectos", "especificaciones"]
            },
            {
                question: "14. Para el siguiente marcado y CSS, indique si cada afirmación es Verdadera o Falsa:",
                type: "true-false",
                code: `<div class="flex-container">
                    <p>Tigers</p>
                    <p>Lions</p>
                    <p>Cheetahs</p>
                </div>
                <style>
                .flex-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .flex-container p {
                    min-width: 200px;
                }
                </style>`,
                statements: [
                    {
                        text: "El párrafo que contiene 'Tigers' se mostrará primero",
                        correct: true
                    },
                    {
                        text: "La sección CSS hace referencia al contenedor flex principal",
                        correct: true
                    },
                    {
                        text: "Cuando los párrafos tengan un ancho menor a 200px, el último se moverá a la línea siguiente",
                        correct: false
                    }
                ]
            },
            {
                question: "15. Complete la definición de la clase Pet seleccionando las opciones correctas:",
                type: "js-class-dropdown",
                code: `class Pet {
                    [1](name, breed) {
                        this.name = [2];
                        this.breed = [3];
                        this.show = function() {
                            const text = "<p>Your pet's name is " + [4] + ". The pet's breed is " + [5] + ".</p>";
                            return [6];
                        };
                    }
                }`,
                options: [
                    {
                        placeholder: "[1]",
                        choices: ["constructor", "function", "init", "create"],
                        correct: 0
                    },
                    {
                        placeholder: "[2]",
                        choices: ["name", "this.name", "breed", "this"],
                        correct: 0
                    },
                    {
                        placeholder: "[3]",
                        choices: ["breed", "this.breed", "name", "this.name"],
                        correct: 0
                    },
                    {
                        placeholder: "[4]",
                        choices: ["this.name", "name", "breed", "this.breed"],
                        correct: 0
                    },
                    {
                        placeholder: "[5]",
                        choices: ["this.breed", "breed", "name", "this.name"],
                        correct: 0
                    },
                    {
                        placeholder: "[6]",
                        choices: ["text", "this.text", "return", "show"],
                        correct: 0
                    }
                ]
            }
        ],
        // Sección 4 (índice 3) - Preguntas 16-20
        [
            {
                question: "16. Complete el código seleccionando la opción correcta en cada lista desplegable:",
                type: "js-class-completion",
                code: `class Pet {
                    [1](name, breed, price, gender) {
                        this.name = name;
                        this.breed = breed;
                        [2]
                        this.price = price;
                        this.gender = gender;
                        this.display = function() {
                            return this.show() + [3];
                        };
                    }
                }`,
                options: [
                    {
                        placeholder: "[1]",
                        choices: ["constructor", "function", "init", "Pet"],
                        correct: 0
                    },
                    {
                        placeholder: "[2]",
                        choices: ["", "this.name = name;", "this.breed = breed;", "this.show = function() {};"],
                        correct: 0
                    },
                    {
                        placeholder: "[3]",
                        choices: ["text", "'text'", "this.text", "gender"],
                        correct: 0
                    }
                ]
            },
            {
                question: "17. Complete el código para mostrar un video promocional en formatos mp4 y webm:",
                type: "code-selection",
                codeQuestion: {
                    template: `<video [1]="320" [2]="240" [3]>\n    <source [4]="[5]/AWpromo.mp4" [6]="[7]">\n    <source [8]="[9]/AWpromo.webm" [10]="[11]">\n    Tu navegador no soporta el elemento de video.\n</video>`,
                    options: [
                        { placeholder: "[1]", choices: ['width', 'size', 'dimension', 'w'], correct: 0 },
                        { placeholder: "[2]", choices: ['height', 'h', 'size', 'length'], correct: 0 },
                        { placeholder: "[3]", choices: ['controls', 'controller', 'player', 'control'], correct: 0 },
                        { placeholder: "[4]", choices: ['src', 'source', 'file', 'media'], correct: 0 },
                        { placeholder: "[5]", choices: ['video', 'videos', 'media', 'assets'], correct: 0 },
                        { placeholder: "[6]", choices: ['type', 'format', 'media-type', 'codec'], correct: 0 },
                        { placeholder: "[7]", choices: ['video/mp4', 'video/webm', 'mp4/video', 'media/mp4'], correct: 0 },
                        { placeholder: "[8]", choices: ['src', 'source', 'file', 'media'], correct: 0 },
                        { placeholder: "[9]", choices: ['video', 'videos', 'media', 'assets'], correct: 0 },
                        { placeholder: "[10]", choices: ['type', 'format', 'media-type', 'codec'], correct: 0 },
                        { placeholder: "[11]", choices: ['video/webm', 'video/mp4', 'webm/video', 'media/webm'], correct: 0 }
                    ]
                }
            },
            {
                question: "18. ¿Qué segmento de código aplica un borde grueso doble de color rojo con esquinas redondeadas de 20px?",
                options: [
                    "<style>h1{border: thick dotted red; border:20px;}</style>", 
                    "<style>h1{border:thin red; border-style:20px;}</style>", 
                    "<style>h1{border: thick double red}</style>", 
                    "<style>h1{border: thick double red; border-radius:20px;}</style>"
                ],
                correct: 3
            },
            {
                question: "19. Complete el marcado para mostrar imágenes de fondo diferentes en móviles y escritorio:",
                type: "code-selection",
                codeQuestion: {
                    template: `[1] welcome {\n    background-image: [2]("SmallLogo.png");\n}\n\n@media only screen and ([3]: [4]px) {\n    [5] welcome {\n        background-image: [6]("NormalLogo.png");\n    }\n}`,
                    options: [
                        { placeholder: "[1]", choices: ['.', '#', '@', '&'], correct: 0 },
                        { placeholder: "[2]", choices: ['url', 'image', 'src', 'link'], correct: 0 },
                        { placeholder: "[3]", choices: ['min-width', 'max-width', 'width', 'screen-width'], correct: 0 },
                        { placeholder: "[4]", choices: ['768', '480', '1024', '320'], correct: 0 },
                        { placeholder: "[5]", choices: ['.', '#', '@', '&'], correct: 0 },
                        { placeholder: "[6]", choices: ['url', 'image', 'src', 'link'], correct: 0 }
                    ]
                }
            },
            {
                question: "20. ¿Qué selector CSS aplica estilo a todos los elementos del documento?",
                options: ["+", ":", "}", "*"],
                correct: 3
            }
        ],

        /*
        // Sección 5 (índice 4) - Preguntas 21-25
        [
            {
                question: "21. Identifica el filtro aplicado a cada imagen:",
                type: "css-filter-dropdown",
                examples: [
                    { description: "Imagen en escala de grises", correctFilter: "filter: grayscale(100%)" },
                    { description: "Imagen con brillo reducido", correctFilter: "filter: brightness(50%)" },
                    { description: "Imagen con alto contraste", correctFilter: "filter: contrast(200%)" }
                ],
                options: [
                    "filter: blur(5px)",
                    "filter: brightness(50%)",
                    "filter: contrast(200%)",
                    "filter: grayscale(100%)",
                    "filter: hue-rotate(90deg)",
                    "filter: sepia(100%)"
                ]
            },
            {
               question: "22. Identifica el filtro aplicado a la imagen: <img src='beach.jpg' style='width:300px; filter: sepia(100%);' alt='beach scene'/>",
                    options: [
                        "opacity(30%)",
                        "sepia(100%)", 
                        "saturate(100%)",
                        "blur(5px)"
                    ],
                        correct: 1 // Índice de la opción correcta (sepia(100%))
            },
            {
                question: "23. Identifica el filtro aplicado a la imagen: <img src='beach.jpg' style='width:300px; filter: opacity(30%);' alt='beach scene'/>",
                    options: [
                        "opacity(30%)",
                        "grayscale(100%)", 
                        "sepia(100%)",
                        "brightness(150%)"
                    ],
                    correct: 0 // opacity(30%)
            },
            {
               question: "24. Identifica el filtro aplicado a la imagen: <img src='beach.jpg' style='width:300px; filter: saturate(100%);' alt='beach scene'/>",
                    options: [
                        "contrast(200%)",
                        "hue-rotate(90deg)", 
                        "saturate(100%)",
                        "invert(100%)"
                    ],
                    correct: 2 // saturate(100%)
            },
            {
                question: "25. Complete el marcado para mostrar una imagen con texto alternativo:",
                type: "code-selection",
                codeQuestion: {
                    template: `<[1] [2]="html5.gif" [3]="[4]" [5]="[6]">`,
                    options: [
                        { placeholder: "[1]", choices: ['<img>', '<image>', '<picture>', '<logo>'], correct: 0 },
                        { placeholder: "[2]", choices: ['src', 'source', 'href', 'file'], correct: 0 },
                        { placeholder: "[3]", choices: ['alt', 'title', 'description', 'text'], correct: 0 },
                        { placeholder: "[4]", choices: ['HTML5 Icon', 'Logo HTML5', 'Imagen de HTML5', 'Icono de HTML5'], correct: 0 },
                        { placeholder: "[5]", choices: ['width', 'size', 'height', 'dimension'], correct: 0 },
                        { placeholder: "[6]", choices: ['128', '64', '256', '512'], correct: 0 }
                    ]
                }
            },

        ]*/
    ];

    // Inicializar el array de respuestas
    userAnswers = Array(quizData.flat().length).fill(null);

    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Event listener para el formulario de registro
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        userData.name = document.getElementById('user-name').value.trim();
        userData.email = document.getElementById('user-email').value.trim();
        
        if (userData.name === '' || userData.email === '') {
            alert('Por favor completa todos los campos');
            return;
        }
        
        if (!validateEmail(userData.email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        registrationContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        document.querySelector('.quiz-container h1').textContent += ` - ${userData.name}`;
        generateQuizSections();
    });

    // Generar las secciones del cuestionario
    function generateQuizSections() {
        console.log("Generando secciones... Total de secciones:", quizData.length);
    quizForm.innerHTML = '';
        
        // Filtrar solo secciones con contenido
        const validSections = quizData.filter(section => Array.isArray(section) && section.length > 0);
        
        validSections.forEach((section, validSectionIndex) => {
            console.log(`Sección ${validSectionIndex} tiene ${section.length} preguntas`);
            
            const sectionElement = document.createElement('div');
            sectionElement.className = `question-section ${validSectionIndex === 0 ? 'active' : ''}`;
            sectionElement.dataset.sectionIndex = validSectionIndex;
            
            section.forEach((question, questionIndex) => {
                const globalQuestionIndex = (validSectionIndex * questionsPerSection) + questionIndex;
                
                const questionElement = document.createElement('div');
                questionElement.className = 'question';
                
                const questionTitle = document.createElement('h3');
                questionTitle.textContent = question.question;
                questionElement.appendChild(questionTitle);
                
                // Generar las opciones de respuesta según el tipo de pregunta
                if (question.type === "css-filter-dropdown") {
                    const container = document.createElement('div');
                    container.className = 'filter-question-container';
                    
                    const questionEl = document.createElement('h3');
                    questionEl.textContent = question.question;
                    container.appendChild(questionEl);
                    
                    question.examples.forEach((example, index) => {
                        const exampleContainer = document.createElement('div');
                        exampleContainer.className = 'filter-example';
                        
                        const descEl = document.createElement('p');
                        descEl.textContent = `${index + 1}. ${example.description}`;
                        exampleContainer.appendChild(descEl);
                        
                        const codeEl = document.createElement('div');
                        codeEl.className = 'filter-code';
                        codeEl.innerHTML = `
                            <img src="beach.jpg" style="width: 300px; [1]" alt="beach scene"/>
                        `.replace('[1]', `
                            <select class="filter-dropdown" data-example-index="${index}">
                                <option value="" disabled selected>Elija un elemento</option>
                                ${question.options.map(opt => `
                                    <option value="${opt}">${opt}</option>
                                `).join('')}
                            </select>
                        `);
                        
                        const dropdown = codeEl.querySelector('select');
                        dropdown.addEventListener('change', () => {
                            if (!userAnswers[globalQuestionIndex]) {
                                userAnswers[globalQuestionIndex] = {};
                            }
                            userAnswers[globalQuestionIndex][index] = dropdown.value;
                            updateProgressBar();
                        });
                        
                        if (userAnswers[globalQuestionIndex] && userAnswers[globalQuestionIndex][index]) {
                            dropdown.value = userAnswers[globalQuestionIndex][index];
                        }
                        
                        exampleContainer.appendChild(codeEl);
                        container.appendChild(exampleContainer);
                    });
                    
                    questionElement.appendChild(container);
                } 
                else if (question.type === "css-terms-dragdrop") {
                    const dragDropContainer = document.createElement('div');
                    dragDropContainer.className = 'css-terms-container';
                    
                    const instructions = document.createElement('p');
                    instructions.className = 'drag-drop-instructions';
                    instructions.textContent = question.question;
                    dragDropContainer.appendChild(instructions);
                    
                    const columnsContainer = document.createElement('div');
                    columnsContainer.className = 'css-terms-columns';
                    
                    // Columna izquierda (términos)
                    const termsColumn = document.createElement('div');
                    termsColumn.className = 'css-terms';
                    termsColumn.innerHTML = '<h4>Términos CSS</h4>';
                    
                    question.options.terms.forEach(term => {
                        const termElement = document.createElement('div');
                        termElement.className = 'draggable-term';
                        termElement.textContent = term.text;
                        termElement.draggable = true;
                        termElement.dataset.termId = term.id;
                        
                        termElement.addEventListener('dragstart', (e) => {
                            e.dataTransfer.setData('text/plain', term.id);
                            e.dataTransfer.setData('text/term', term.text);
                            setTimeout(() => termElement.classList.add('dragging'), 0);
                        });
                        
                        termElement.addEventListener('dragend', () => {
                            termElement.classList.remove('dragging');
                        });
                        
                        termsColumn.appendChild(termElement);
                    });
                    
                    // Columna derecha (ejemplos)
                    const examplesColumn = document.createElement('div');
                    examplesColumn.className = 'css-examples';
                    examplesColumn.innerHTML = '<h4>Ejemplos</h4>';
                    
                    question.options.examples.forEach(example => {
                        const exampleElement = document.createElement('div');
                        exampleElement.className = 'example-slot';
                        exampleElement.dataset.exampleId = example.id;
                        
                        const codeElement = document.createElement('pre');
                        codeElement.className = 'example-code';
                        codeElement.textContent = example.code;
                        exampleElement.appendChild(codeElement);
                        
                        const dropZone = document.createElement('div');
                        dropZone.className = 'drop-zone';
                        dropZone.innerHTML = '<span class="drop-hint">Arrastre aquí</span>';
                        
                        dropZone.addEventListener('dragover', (e) => {
                            e.preventDefault();
                            dropZone.classList.add('drag-over');
                        });
                        
                        dropZone.addEventListener('dragleave', () => {
                            dropZone.classList.remove('drag-over');
                        });
                        
                        dropZone.addEventListener('drop', (e) => {
                            e.preventDefault();
                            dropZone.classList.remove('drag-over');
                            
                            const termId = e.dataTransfer.getData('text/plain');
                            const termText = e.dataTransfer.getData('text/term');
                            
                            // Limpiar asignaciones previas
                            document.querySelectorAll(`.term-assignment[data-term-id="${termId}"]`).forEach(el => el.remove());
                            dropZone.innerHTML = '';
                            
                            const assignedTerm = document.createElement('div');
                            assignedTerm.className = 'term-assignment';
                            assignedTerm.textContent = termText;
                            assignedTerm.dataset.termId = termId;
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'remove-term';
                            removeBtn.innerHTML = '&times;';
                            removeBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                assignedTerm.remove();
                                dropZone.innerHTML = '<span class="drop-hint">Arrastre aquí</span>';
                                updateCssTermsAnswers();
                            });
                            
                            assignedTerm.appendChild(removeBtn);
                            dropZone.appendChild(assignedTerm);
                            
                            updateCssTermsAnswers();
                        });
                        
                        exampleElement.appendChild(dropZone);
                        examplesColumn.appendChild(exampleElement);
                    });
                    
                    function updateCssTermsAnswers() {
                        const answer = {};
                        document.querySelectorAll('.example-slot').forEach(slot => {
                            const exampleId = slot.dataset.exampleId;
                            const termElement = slot.querySelector('.term-assignment');
                            answer[exampleId] = termElement ? termElement.dataset.termId : null;
                        });
                        
                        userAnswers[globalQuestionIndex] = answer;
                        updateProgressBar();
                    }
                    
                    columnsContainer.appendChild(termsColumn);
                    columnsContainer.appendChild(examplesColumn);
                    dragDropContainer.appendChild(columnsContainer);
                    questionElement.appendChild(dragDropContainer);
                }
                else if (question.type === "code-selection") {
                    const codeContainer = document.createElement('div');
                    codeContainer.className = 'code-question-container';
                    
                    const codeTemplate = document.createElement('pre');
                    codeTemplate.className = 'code-template';
                    
                    const lines = question.codeQuestion.template.split('\n');
                    
                    lines.forEach(line => {
                        const lineElement = document.createElement('div');
                        lineElement.className = 'code-line';
                        
                        const parts = line.split(/(\[\d+\])/);
                        
                        parts.forEach(part => {
                            if (part.match(/\[\d+\]/)) {
                                const placeholder = part.replace(/[\[\]]/g, '');
                                const select = document.createElement('select');
                                select.className = 'code-select';
                                select.dataset.placeholder = placeholder;
                                select.dataset.questionIndex = globalQuestionIndex;
                                
                                const optionGroup = question.codeQuestion.options.find(
                                    opt => opt.placeholder === `[${placeholder}]`
                                );
                                
                                if (optionGroup) {
                                    const defaultOption = document.createElement('option');
                                    defaultOption.value = '';
                                    defaultOption.textContent = `Seleccione para [${placeholder}]`;
                                    defaultOption.disabled = true;
                                    defaultOption.selected = true;
                                    select.appendChild(defaultOption);
                                    
                                    optionGroup.choices.forEach((choice, idx) => {
                                        const option = document.createElement('option');
                                        option.value = idx;
                                        option.textContent = choice;
                                        select.appendChild(option);
                                    });
                                    
                                    if (userAnswers[globalQuestionIndex] && userAnswers[globalQuestionIndex][placeholder] !== undefined) {
                                        select.value = userAnswers[globalQuestionIndex][placeholder];
                                    }
                                    
                                    select.addEventListener('change', () => {
                                        if (!userAnswers[globalQuestionIndex]) {
                                            userAnswers[globalQuestionIndex] = {};
                                        }
                                        userAnswers[globalQuestionIndex][placeholder] = parseInt(select.value);
                                        updateProgressBar();
                                    });
                                }
                                
                                lineElement.appendChild(select);
                            } else {
                                const textNode = document.createTextNode(part);
                                lineElement.appendChild(textNode);
                            }
                        });
                        
                        codeTemplate.appendChild(lineElement);
                    });
                    
                    codeContainer.appendChild(codeTemplate);
                    questionElement.appendChild(codeContainer);
                }
                else if (question.type === "dropdown-completion") {
                    const container = document.createElement('div');
                    container.className = 'dropdown-question-container';
                    
                    const questionEl = document.createElement('h3');
                    questionEl.textContent = question.question;
                    container.appendChild(questionEl);
                    
                    const codeContainer = document.createElement('div');
                    codeContainer.className = 'code-editor-container';
                    
                    const lines = question.code.split('\n');
                    
                    lines.forEach(line => {
                        const lineDiv = document.createElement('div');
                        lineDiv.className = 'code-line';
                        
                        const parts = line.split(/(\[\d+\])/);
                        
                        parts.forEach(part => {
                            if (part.match(/\[\d+\]/)) {
                                const placeholder = part.replace(/[\[\]]/g, '');
                                const select = document.createElement('select');
                select.className = 'code-dropdown';
                select.dataset.placeholder = placeholder;
                
                const optionGroup = question.options.find(
                    opt => opt.placeholder === `[${placeholder}]`
                );
                
                // Opción por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = `Elija un elemento`;
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);
                
                // Agregar opciones
                optionGroup.choices.forEach((choice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = choice;
                    select.appendChild(option);
                });
                
                // Restaurar selección previa
                if (userAnswers[globalQuestionIndex] && 
                    userAnswers[globalQuestionIndex][placeholder] !== undefined) {
                    select.value = userAnswers[globalQuestionIndex][placeholder];
                }
                
                select.addEventListener('change', () => {
                    if (!userAnswers[globalQuestionIndex]) {
                        userAnswers[globalQuestionIndex] = {};
                    }
                    userAnswers[globalQuestionIndex][placeholder] = select.value;
                    updateProgressBar();
                });
                
                lineDiv.appendChild(select);
            } else {
                lineDiv.appendChild(document.createTextNode(part));
            }
        });
        
        codeContainer.appendChild(lineDiv);
    });
    
    container.appendChild(codeContainer);
    questionElement.appendChild(container);
}

else if (question.type === "js-class-dropdown") {
    const container = document.createElement('div');
    container.className = 'js-class-container';
    
    // Pregunta
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    // Contenedor de código editable
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-editor';
    
    // Dividir el código por líneas
    const lines = question.code.split('\n');
    
    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        
        // Buscar placeholders [1], [2], etc.
        const parts = line.split(/(\[\d+\])/);
        
        parts.forEach(part => {
            if (part.match(/\[\d+\]/)) {
                const placeholder = part.replace(/[\[\]]/g, '');
                const select = document.createElement('select');
                select.className = 'code-select';
                select.dataset.placeholder = placeholder;
                
                const optionGroup = question.options.find(
                    opt => opt.placeholder === `[${placeholder}]`
                );
                
                // Opción por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = `Seleccione`;
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);
                
                // Agregar opciones
                optionGroup.choices.forEach((choice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = choice;
                    select.appendChild(option);
                });
                
                // Restaurar selección previa
                if (userAnswers[globalQuestionIndex] && 
                    userAnswers[globalQuestionIndex][placeholder] !== undefined) {
                    select.value = userAnswers[globalQuestionIndex][placeholder];
                }
                
                select.addEventListener('change', () => {
                    if (!userAnswers[globalQuestionIndex]) {
                        userAnswers[globalQuestionIndex] = {};
                    }
                    userAnswers[globalQuestionIndex][placeholder] = select.value;
                    updateProgressBar();
                });
                
                lineDiv.appendChild(select);
            } else {
                lineDiv.appendChild(document.createTextNode(part));
            }
        });
        
        codeContainer.appendChild(lineDiv);
    });
    
    container.appendChild(codeContainer);
    questionElement.appendChild(container);
}

//seccion listas
else if (question.type === "dropdown-completion") {
    const container = document.createElement('div');
    container.className = 'dropdown-question-container';
    
    // Pregunta
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    // Contenedor de código editable
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-editor-container';
    
    // Dividir el código por placeholders
    const lines = question.code.split('\n');
    
    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        
        const parts = line.split(/(\[\d+\])/);
        
        parts.forEach(part => {
            if (part.match(/\[\d+\]/)) {
                const placeholder = part.replace(/[\[\]]/g, '');
                const select = document.createElement('select');
                select.className = 'code-dropdown';
                select.dataset.placeholder = placeholder;
                
                const optionGroup = question.options.find(
                    opt => opt.placeholder === `[${placeholder}]`
                );
                
                // Opción por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = `-- Seleccione --`;
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);
                
                // Agregar opciones
                optionGroup.choices.forEach((choice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = choice;
                    select.appendChild(option);
                });
                
                // Restaurar selección previa si existe
                if (userAnswers[globalQuestionIndex] && 
                    userAnswers[globalQuestionIndex][placeholder] !== undefined) {
                    select.value = userAnswers[globalQuestionIndex][placeholder];
                }
                
                select.addEventListener('change', () => {
                    if (!userAnswers[globalQuestionIndex]) {
                        userAnswers[globalQuestionIndex] = {};
                    }
                    userAnswers[globalQuestionIndex][placeholder] = select.value;
                    updateProgressBar();
                });
                
                lineDiv.appendChild(select);
            } else {
                lineDiv.appendChild(document.createTextNode(part));
            }
        });
        
        codeContainer.appendChild(lineDiv);
    });
    
    container.appendChild(codeContainer);
    questionElement.appendChild(container);
}

    else if (question.type === "css-filter-dropdown") {
    const container = document.createElement('div');
    container.className = 'filter-question-container';
    
    // Pregunta
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    // Ejemplos de imágenes con dropdowns
    question.examples.forEach((example, index) => {
        const exampleContainer = document.createElement('div');
        exampleContainer.className = 'filter-example';
        
        // Descripción
        const descEl = document.createElement('p');
        descEl.textContent = `${index + 1}. ${example.description}`;
        exampleContainer.appendChild(descEl);
        
        // Código HTML con dropdown
        const codeEl = document.createElement('div');
        codeEl.className = 'filter-code';
        codeEl.innerHTML = `
            <img src="beach.jpg" style="width: 300px; [1]" alt="beach scene"/>
        `.replace('[1]', `
            <select class="filter-dropdown" data-example-index="${index}">
                <option value="" disabled selected>Elija un elemento</option>
                ${question.options.map(opt => `
                    <option value="${opt}">${opt}</option>
                `).join('')}
            </select>
        `);
        
        // Manejar selección
        const dropdown = codeEl.querySelector('select');
        dropdown.addEventListener('change', () => {
            if (!userAnswers[globalQuestionIndex]) {
                userAnswers[globalQuestionIndex] = {};
            }
            userAnswers[globalQuestionIndex][index] = dropdown.value;
            updateProgressBar();
        });
        
        // Restaurar selección previa
        if (userAnswers[globalQuestionIndex] && userAnswers[globalQuestionIndex][index]) {
            dropdown.value = userAnswers[globalQuestionIndex][index];
        }
        
        exampleContainer.appendChild(codeEl);
        container.appendChild(exampleContainer);
    });
    
    questionElement.appendChild(container);
}
//preguntas de verdadero o falso

else if (question.type === "true-false") {
    const container = document.createElement('div');
    container.className = 'true-false-container';
    
    // Mostrar pregunta y código
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    if (question.code) {
        const codeEl = document.createElement('pre');
        codeEl.className = 'tf-code';
        codeEl.textContent = question.code;
        container.appendChild(codeEl);
    }
    
    // Crear tabla de afirmaciones
    const table = document.createElement('table');
    table.className = 'tf-statements';
    
    // Cabecera
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Afirmación</th>
            <th>Verdadero</th>
            <th>Falso</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Cuerpo
    const tbody = document.createElement('tbody');
    
    question.statements.forEach((statement, index) => {
        const row = document.createElement('tr');
        
        // Celda de afirmación
        const statementCell = document.createElement('td');
        statementCell.textContent = statement.text;
        row.appendChild(statementCell);
        
        // Celdas de opciones (Verdadero/Falso)
        ['true', 'false'].forEach(value => {
            const cell = document.createElement('td');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `tf-${globalQuestionIndex}-${index}`;
            radio.value = value;
            
            // Restaurar respuesta si existe
            if (userAnswers[globalQuestionIndex] && 
                userAnswers[globalQuestionIndex][index] === value) {
                radio.checked = true;
            }
            
            radio.addEventListener('change', () => {
                if (!userAnswers[globalQuestionIndex]) {
                    userAnswers[globalQuestionIndex] = {};
                }
                userAnswers[globalQuestionIndex][index] = value;
                updateProgressBar();
            });
            
            cell.appendChild(radio);
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
    questionElement.appendChild(container);
}

//seccion para mover objetos
else if (question.type === "qa-testing-dragdrop") {
    const container = document.createElement('div');
    container.className = 'dragdrop-question-container';
    
    // Pregunta
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    // Contenedor principal
    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'dragdrop-columns';
    
    // Columna izquierda (tareas disponibles)
    const tasksColumn = document.createElement('div');
    tasksColumn.className = 'tasks-column';
    tasksColumn.innerHTML = '<h4>Tareas Disponibles</h4>';
    
    question.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'draggable-task';
        taskElement.textContent = task.text;
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;
        
        taskElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            e.dataTransfer.setData('text/task', task.text);
            taskElement.classList.add('dragging');
        });
        
        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
        });
        
        tasksColumn.appendChild(taskElement);
    });
    
    // Columna derecha (área de respuesta)
    const answerColumn = document.createElement('div');
    answerColumn.className = 'answer-column';
    answerColumn.innerHTML = '<h4>Área de Respuesta</h4>';
    
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const taskText = e.dataTransfer.getData('text/task');
        
        // Verificar si la tarea ya fue agregada
        if (!dropZone.querySelector(`[data-task-id="${taskId}"]`)) {
            const taskElement = document.createElement('div');
            taskElement.className = 'dropped-task';
            taskElement.textContent = taskText;
            taskElement.dataset.taskId = taskId;
            
            // Botón para eliminar
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-task';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', () => {
                taskElement.remove();
                updateQATestingAnswer();
            });
            
            taskElement.appendChild(removeBtn);
            dropZone.appendChild(taskElement);
            
            updateQATestingAnswer();
        }
    });
    
    answerColumn.appendChild(dropZone);
    columnsContainer.appendChild(tasksColumn);
    columnsContainer.appendChild(answerColumn);
    container.appendChild(columnsContainer);
    
    // Función para actualizar respuestas
    function updateQATestingAnswer() {
        const answer = [];
        dropZone.querySelectorAll('.dropped-task').forEach(task => {
            answer.push(task.dataset.taskId);
        });
        
        userAnswers[globalQuestionIndex] = answer;
        updateProgressBar();
    }


    //no haya duplucado de textos
    
    
    questionElement.appendChild(container);
}

//seccion para seleccion de mas de una opcion

else if (question.type === "touch-events-multiple") {
    const container = document.createElement('div');
    container.className = 'touch-question-container';
    
    // Pregunta
    const questionEl = document.createElement('h3');
    questionEl.textContent = question.question;
    container.appendChild(questionEl);
    
    // Opciones (checkboxes para múltiple selección)
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'touch-options';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'touch-option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `touch-option-${globalQuestionIndex}-${index}`;
        checkbox.name = `touch-options-${globalQuestionIndex}`;
        checkbox.value = index;
        
        // Verificar si ya estaba seleccionado
        if (userAnswers[globalQuestionIndex] && userAnswers[globalQuestionIndex].includes(index)) {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', () => {
            if (!userAnswers[globalQuestionIndex]) {
                userAnswers[globalQuestionIndex] = [];
            }
            
            if (checkbox.checked) {
                userAnswers[globalQuestionIndex].push(index);
            } else {
                userAnswers[globalQuestionIndex] = userAnswers[globalQuestionIndex].filter(i => i !== index);
            }
            
            // Limitar a 2 selecciones como máximo
            if (userAnswers[globalQuestionIndex].length > 2) {
                const oldestSelection = userAnswers[globalQuestionIndex].shift();
                document.getElementById(`touch-option-${globalQuestionIndex}-${oldestSelection}`).checked = false;
            }
            
            updateProgressBar();
        });
        
        const label = document.createElement('label');
        label.htmlFor = `touch-option-${globalQuestionIndex}-${index}`;
        label.textContent = option.text;
        
        optionDiv.appendChild(checkbox);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    });
    
    container.appendChild(optionsContainer);
    questionElement.appendChild(container);
}
                else if (question.type === "dynamic-selector") {
                    // NUEVO: Manejo de pregunta dinámica de selector CSS
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'dynamic-options';
                    
                    question.options.forEach((option, optionIndex) => {
                        const button = document.createElement('button');
                        button.textContent = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
                        button.dataset.value = optionIndex;
                        
                        if (userAnswers[globalQuestionIndex] === optionIndex) {
                            button.classList.add('selected');
                        }
                        
                        button.addEventListener('click', () => {
                            optionsContainer.querySelectorAll('button').forEach(btn => {
                                btn.classList.remove('selected');
                            });
                            button.classList.add('selected');
                            userAnswers[globalQuestionIndex] = optionIndex;
                            updateProgressBar();
                            
                            // Demo visual solo para el selector universal (*)
                            if (optionIndex === 1) {
                                const allElements = questionElement.querySelectorAll('*');
                                allElements.forEach(el => {
                                    el.style.color = 'blue';
                                });
                                
                                setTimeout(() => {
                                    allElements.forEach(el => {
                                        el.style.color = '';
                                    });
                                }, 2000);
                            }
                        });
                        
                        optionsContainer.appendChild(button);
                    });
                    
                    questionElement.appendChild(optionsContainer);
                }
                // En tu función generateQuizSections(), añade este caso al manejo de tipos:
else if (question.type === "css-pseudo-classes") {
    const matchingContainer = document.createElement('div');
    matchingContainer.className = 'matching-question-container';
    
    const description = document.createElement('p');
    description.innerHTML = `<strong>Instrucciones:</strong> ${question.question}`;
    matchingContainer.appendChild(description);
    
    // Contenedor principal
    const dragDropContainer = document.createElement('div');
    dragDropContainer.className = 'css-drag-drop-container';
    dragDropContainer.style.display = 'flex';
    dragDropContainer.style.gap = '20px';
    
    // Columna izquierda (selectores)
    const leftColumn = document.createElement('div');
    leftColumn.className = 'css-selectors-column';
    leftColumn.innerHTML = '<h4>Selectores CSS</h4>';
    
    question.options.leftItems.forEach(item => {
        const draggableItem = document.createElement('div');
        draggableItem.className = 'draggable-item';
        draggableItem.textContent = item.text;
        draggableItem.draggable = true;
        draggableItem.dataset.id = item.id;
        
        draggableItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
        });
        
        leftColumn.appendChild(draggableItem);
    });
    
    // Columna derecha (slots)
    const rightColumn = document.createElement('div');
    rightColumn.className = 'css-slots-column';
    rightColumn.innerHTML = '<h4>Comportamientos</h4>';
    
    question.options.rightSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = 'drop-slot';
        slotElement.dataset.slotId = slot.id;
        
        const slotLabel = document.createElement('div');
        slotLabel.className = 'slot-label';
        slotLabel.textContent = slot.text;
        slotElement.appendChild(slotLabel);
        
        const slotContent = document.createElement('div');
        slotContent.className = 'slot-content';
        slotElement.appendChild(slotContent);
        
        slotElement.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        slotElement.addEventListener('drop', (e) => {
            e.preventDefault();
            const selectorId = e.dataTransfer.getData('text/plain');
            const selector = question.options.leftItems.find(item => item.id === selectorId);
            
            if (selector) {
                // Limpiar cualquier asignación previa de este selector
                document.querySelectorAll(`.slot-content [data-selector-id="${selectorId}"]`)
                    .forEach(el => el.remove());
                
                // Crear nuevo elemento en el slot
                const selectorElement = document.createElement('div');
                selectorElement.className = 'selected-selector';
                selectorElement.textContent = selector.text;
                selectorElement.dataset.selectorId = selectorId;
                
                // Botón para eliminar
                const removeBtn = document.createElement('button');
                removeBtn.textContent = '×';
                removeBtn.className = 'remove-selector';
                removeBtn.addEventListener('click', () => {
                    selectorElement.remove();
                    updateCssPseudoAnswer();
                });
                
                selectorElement.appendChild(removeBtn);
                slotContent.appendChild(selectorElement);
                
                updateCssPseudoAnswer();
            }
        });
        
        rightColumn.appendChild(slotElement);
    });
    
    dragDropContainer.appendChild(leftColumn);
    dragDropContainer.appendChild(rightColumn);
    matchingContainer.appendChild(dragDropContainer);
    questionElement.appendChild(matchingContainer);
    
    // Función para actualizar las respuestas
    function updateCssPseudoAnswer() {
        const answer = {};
        document.querySelectorAll('.drop-slot').forEach(slot => {
            const slotId = slot.dataset.slotId;
            const selectors = Array.from(slot.querySelectorAll('.selected-selector')).map(el => el.dataset.selectorId);
            answer[slotId] = selectors;
        });
        
        userAnswers[globalQuestionIndex] = answer;
        updateProgressBar();
    }
}
                else {
                    // Pregunta normal con opciones de radio
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'options';
                    
                    question.options.forEach((option, optionIndex) => {
                        const optionContainer = document.createElement('div');
                        optionContainer.className = 'option';
                        
                        const radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.name = `q${globalQuestionIndex}`;
                        radioInput.id = `q${globalQuestionIndex}_o${optionIndex}`;
                        radioInput.value = optionIndex;
                        
                        if (userAnswers[globalQuestionIndex] === optionIndex) {
                            radioInput.checked = true;
                        }
                        
                        radioInput.addEventListener('change', () => {
                            userAnswers[globalQuestionIndex] = optionIndex;
                            updateProgressBar();
                        });
                        
                        const label = document.createElement('label');
                        label.htmlFor = `q${globalQuestionIndex}_o${optionIndex}`;
                        label.textContent = option;
                        
                        optionContainer.appendChild(radioInput);
                        optionContainer.appendChild(label);
                        optionsContainer.appendChild(optionContainer);
                    });
                    
                    questionElement.appendChild(optionsContainer);
                }
                
                sectionElement.appendChild(questionElement);
            });
            
            quizForm.appendChild(sectionElement);
        });
        
        updateProgressBar();
        updateNavigationButtons();
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const allQuestions = quizData.flat();
        const totalQuestions = allQuestions.length;
        let answeredQuestions = 0;
        
        allQuestions.forEach((question, index) => {
            const answer = userAnswers[index];
            
            if (!answer) return;
            
            if (question.type === "code-selection") {
                const placeholders = question.codeQuestion.options.map(opt => 
                    opt.placeholder.replace(/[\[\]]/g, '')
                );
                const allAnswered = placeholders.every(ph => answer[ph] !== undefined);
                if (allAnswered) answeredQuestions++;
            } 
            else if (question.type === "true-false") {
                const allAnswered = question.options.every((_, optIndex) => 
                    answer[optIndex] !== undefined
                );
                if (allAnswered) answeredQuestions++;
            }
            else if (question.type === "matching") {
                const allAnswered = question.matchingQuestion.items.every(item => 
                    answer[item.id] !== undefined
                );
                if (allAnswered) answeredQuestions++;
            }
            else {
                if (answer !== null) answeredQuestions++;
            }
        });
        
        const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}%`;
    }

    // Actualizar los botones de navegación
  function updateNavigationButtons() {
     console.log(`Generando sección ${validSectionIndex} con ${section.length} preguntas`);
    
    prevBtn.disabled = currentSection === 0;
    
    if (currentSection === validSections.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function goToSection(sectionIndex) {
    console.log(`Intentando ir a sección ${sectionIndex}`);
    
    // Obtener solo secciones válidas
    const validSections = quizData.filter(section => Array.isArray(section) && section.length > 0);
    
    // Validación de límites
    if (sectionIndex < 0 || sectionIndex >= validSections.length) {
        console.error(`Índice ${sectionIndex} fuera de rango. Total secciones válidas: ${validSections.length}`);
        return;
    }
    
    // Ocultar todas las secciones primero
    document.querySelectorAll('.question-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar nueva sección
    const newSectionElement = document.querySelector(`.question-section[data-section-index="${sectionIndex}"]`);
    if (newSectionElement) {
        newSectionElement.classList.add('active');
        currentSection = sectionIndex;
        updateNavigationButtons();
        newSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error(`No se encontró elemento para sección ${sectionIndex}`);
    }
}
    
    // Cambiar a una sección específica


    /*
    function goToSection(sectionIndex) {
    console.log(`Intentando ir a sección ${sectionIndex}`);
    
    // Obtener solo secciones válidas
    const validSections = quizData.filter(section => Array.isArray(section) && section.length > 0);
    
   // Validación de límites

   
    if (sectionIndex < 0 || sectionIndex >= validSections.length) {
        console.error(`Índice ${sectionIndex} fuera de rango. Total secciones válidas: ${validSections.length}`);
        return;
    }
    
    // Ocultar sección actual
    const currentSectionElement = document.querySelector('.question-section.active');
    if (currentSectionElement) {
        currentSectionElement.classList.remove('active');
    }
    
    // Mostrar nueva sección
         const newSectionElement = document.querySelector(`.question-section[data-section-index="${sectionIndex}"]`);
    if (newSectionElement) {
        newSectionElement.classList.add('active');
        currentSection = sectionIndex;
        updateNavigationButtons();
        newSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error(`No se encontró elemento para sección ${sectionIndex}`);
    
        }
    }*/


    // Calcular el puntaje
   function calculateScore() {
    const allQuestions = quizData.flat();
    let score = 0;
    
    allQuestions.forEach((question, index) => {
        const answer = userAnswers[index];
        
        if (answer === null || answer === undefined) return; // Pregunta no respondida
        
        if (question.type === "code-selection") {
            let allCorrect = true;
            question.codeQuestion.options.forEach(opt => {
                const placeholder = opt.placeholder.replace(/[\[\]]/g, '');
                if (answer[placeholder] === undefined || answer[placeholder] != opt.correct) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        } 
        else if (question.type === "true-false") {
            let allCorrect = true;
            question.statements.forEach((statement, stIndex) => {
                const userAnswer = answer[stIndex];
                const isCorrect = (userAnswer === 'true' && statement.correct) || 
                                 (userAnswer === 'false' && !statement.correct);
                if (!isCorrect) allCorrect = false;
            });
            if (allCorrect) score++;
        }
        else if (question.type === "css-terms-dragdrop") {
            let allCorrect = true;
            question.options.examples.forEach(example => {
                if (answer[example.id] !== example.correct) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        }
        else if (question.type === "qa-testing-dragdrop") {
            let correctCount = 0;
            question.correctAnswers.forEach(correctId => {
                if (answer.includes(correctId)) correctCount++;
            });
            // Dar puntos parciales basados en cuántas respuestas correctas seleccionó
            score += correctCount / question.correctAnswers.length;
        }
        else if (question.type === "dropdown-completion" || question.type === "js-class-dropdown") {
            let allCorrect = true;
            question.options.forEach(opt => {
                const userChoice = answer[opt.placeholder.replace(/[\[\]]/g, '')];
                if (userChoice == undefined || userChoice != opt.correct) {
                    allCorrect = false;
                }
            });
            if (allCorrect) score++;
        }
        else if (question.type === "css-filter-dropdown") {
            let correctCount = 0;
            question.examples.forEach((example, exIndex) => {
                if (answer[exIndex] === example.correctFilter) {
                    correctCount++;
                }
            });
            // Dar puntos parciales
            score += correctCount / question.examples.length;
        }
        else if (question.type === "touch-events-multiple") {
            let correctCount = 0;
            question.options.forEach((option, optIndex) => {
                if (option.correct && answer.includes(optIndex)) {
                    correctCount++;
                }
            });
            // Normalizar el puntaje para que el máximo sea 1
            const maxPossible = question.options.filter(opt => opt.correct).length;
            score += correctCount / maxPossible;
        }
        else {
            // Preguntas normales de opción única
            if (answer === question.correct) {
                score++;
            }
        }
    });
    
    return Math.round(score * 100) / 100; // Redondear a 2 decimales
}

    // Mostrar resultados

    submitBtn.addEventListener('click', () => {
         showResults();
    // Oculta el cuestionario
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    let score = 0;
    let total = 0;

    quizData.forEach((section, sectionIndex) => {
        section.forEach((question, questionIndex) => {
            const globalIndex = sectionIndex * questionsPerSection + questionIndex;
            const userAnswer = userAnswers[globalIndex];

            if (question.correct !== undefined) {
                total++;
                if (userAnswer === question.correct) {
                    score++;
                }
            }
        });
    });

    scoreDisplay.textContent = `Puntaje: ${score} de ${total}`;
});
function showResults() {
    const score = calculateScore();
    const totalQuestions = quizData.flat().length;
    const allQuestions = quizData.flat();
    
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    scoreDisplay.innerHTML = `
        <p><strong>Participante:</strong> ${userData.name}</p>
        <p><strong>Correo:</strong> ${userData.email}</p>
        <p><strong>Puntuación:</strong> ${score} de ${totalQuestions} puntos (${Math.round((score / totalQuestions) * 100)}%)</p>
    `;
    
    const answersContainer = document.getElementById('correct-answers-container');
    answersContainer.innerHTML = '<h3>Detalle de respuestas:</h3>';
    
    allQuestions.forEach((question, index) => {
        const answerElement = document.createElement('div');
        const userAnswer = userAnswers[index];
        let isCorrect = false;
        let userAnswerText = '';
        let correctAnswerText = '';
        
        // Determinar si la respuesta es correcta y generar textos
        if (question.type === "code-selection") {
            isCorrect = isCodeAnswerCorrect(question, userAnswer);
            userAnswerText = userAnswer ? 'Seleccionado' : 'No respondido';
            correctAnswerText = question.codeQuestion.options.map(opt => 
                `${opt.placeholder}: ${opt.choices[opt.correct]}`
            ).join('<br>');
        } 
        else if (question.type === "true-false") {
            isCorrect = isTrueFalseAnswerCorrect(question, userAnswer);
            userAnswerText = userAnswer ? Object.entries(userAnswer).map(([idx, val]) => 
                `Afirmación ${parseInt(idx)+1}: ${val}`
            ).join('<br>') : 'No respondido';
            correctAnswerText = question.statements.map((stmt, stIdx) => 
                `Afirmación ${stIdx+1}: ${stmt.correct ? 'Verdadero' : 'Falso'}`
            ).join('<br>');
        }
        // ... otros tipos de preguntas
        
        answerElement.className = `correct-answer ${isCorrect ? 'correct' : 'incorrect'}`;
        answerElement.innerHTML = `
            <h4>Pregunta ${index + 1}: ${question.question}</h4>
            <p><span class="user-answer">Tu respuesta:</span> ${userAnswerText || 'No respondiste'}</p>
            <p><span class="correct-option">Respuesta correcta:</span> ${correctAnswerText}</p>
            ${question.explanation ? `<div class="explanation">${question.explanation}</div>` : ''}
        `;
        
        answersContainer.appendChild(answerElement);
    });
}
    // Funciones auxiliares para verificación de respuestas
    function isCodeAnswerCorrect(question, userAnswer) {
        if (!userAnswer) return false;
        let allCorrect = true;
        question.codeQuestion.options.forEach(opt => {
            const placeholder = opt.placeholder.replace(/[\[\]]/g, '');
            if (userAnswer[placeholder] === undefined || userAnswer[placeholder] !== opt.correct) {
                allCorrect = false;
            }
        });
        return allCorrect;
    }

    function isTrueFalseAnswerCorrect(question, userAnswer) {
        if (!userAnswer) return false;
        let allCorrect = true;
        question.options.forEach((_, optionIndex) => {
            const userValue = userAnswer[`${optionIndex}`];
            const isActuallyTrue = question.correct.includes(optionIndex);
            
            if ((userValue === 'true' && !isActuallyTrue) || 
                (userValue === 'false' && isActuallyTrue)) {
                allCorrect = false;
            }
        });
        return allCorrect;
    }

    function isMatchingAnswerCorrect(question, userAnswer) {
        if (!userAnswer) return false;
        let allCorrect = true;
        question.matchingQuestion.items.forEach(item => {
            if (userAnswer[item.id] == undefined || userAnswer[item.id] != item.correctRight) {
                allCorrect = false;
            }
        });
        return allCorrect;
    }

    // Event listeners para los botones
// Controlar botones de navegación
nextBtn.addEventListener('click', () => {
    const sections = document.querySelectorAll('.question-section');
    if (currentSection < sections.length - 1) {
        sections[currentSection].classList.remove('active');
        currentSection++;
        sections[currentSection].classList.add('active');

        prevBtn.disabled = false;
        if (currentSection === sections.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        }

        updateProgressBar();
    }
});

prevBtn.addEventListener('click', () => {
    const sections = document.querySelectorAll('.question-section');
    if (currentSection > 0) {
        sections[currentSection].classList.remove('active');
        currentSection--;
        sections[currentSection].classList.add('active');

        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';

        if (currentSection === 0) {
            prevBtn.disabled = true;
        }

        updateProgressBar();
    }
});

});