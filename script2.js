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

    // Datos del cuestionario (9 secciones de 5 preguntas cada una)
    const quizData = [
        // Sección adicional (índice 9) - Preguntas del pre.html
[
    {
        question: "1. ¿Cuál es el valor por defecto de la propiedad position en CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        correct: 3
    },
    {
        question: "2. ¿Qué selector aplica un estilo a todos los elementos del documento?",
        options: [".all", "#todo", "*", "body"],
        correct: 2
    },
    {
        question: "3. ¿Cuál es la sintaxis correcta para cambiar el color de un vínculo visitado a magenta?",
        options: [
            "a:link { color: magenta; }",
            "a:visited { color: magenta; }",
            "a:link { color = magenta; }",
            "a:visited { color = magenta; }"
        ],
        correct: 1
    },
    {
        question: "4. ¿Qué valor de la propiedad position mantiene un elemento fijo en la pantalla?",
        options: ["absolute", "relative", "fixed", "static"],
        correct: 2
    },
    {
        question: "5. ¿Cuál código aplica un borde rojo y fondo azul correctamente?",
        options: [
            "border-color = red; background-color = blue;",
            "border: 10px red; background = blue;",
            "border: 10px outset red; background-color: blue;",
            "background-color: blue; border = red;"
        ],
        correct: 2
    }
],
[
    {
        question: "6. ¿Qué etiqueta HTML es semántica y se usa para navegación?",
        options: ["<nav>", "<section>", "<aside>", "<div>"],
        correct: 0
    },
    {
        question: "7. ¿Qué código mostrará controles de reproducción y pausa en un archivo de audio?",
        options: [
            "<audio autoplay>",
            "<audio preload=\"controls\">",
            "<audio preload=\"auto\">",
            "<audio controls>"
        ],
        correct: 3
    },
    {
        question: "8. ¿Qué etiqueta se usa para proporcionar una descripción a una imagen en HTML5?",
        options: ["<figcaption>", "<caption>", "<legend>", "<summary>"],
        correct: 0
    },
    {
        question: "9. ¿Qué selector se usa para aplicar estilos a todos los elementos con clase \"main\"?",
        options: ["#main", "a[name=\"main\"]", ".main", "a#main"],
        correct: 2
    },
    {
        question: "10. ¿Cuál es el orden correcto en el ciclo de vida de una aplicación?",
        options: [
            "Escribir código → Implementar → Validar",
            "Validar → Empaquetar → Escribir código",
            "Escribir código → Validar → Empaquetar → Implementar",
            "Depurar → Implementar → Validar"
        ],
        correct: 2
    }
],
[
    {
        question: "11. ¿Qué propiedad de CSS se usa para establecer el espacio entre líneas?",
        options: ["line-height", "letter-spacing", "gap", "spacing"],
        correct: 0
    },
    {
        question: "12. ¿Qué elemento permite cargar estilos externos en una página HTML?",
        options: ["<style>", "<meta>", "<link>", "<script>"],
        correct: 2
    },
    {
        question: "13. ¿Qué atributo meta permite definir la escala de una página en dispositivos móviles?",
        options: [
            "name=\"description\"",
            "name=\"content\"",
            "name=\"viewport\"",
            "name=\"keywords\""
        ],
        correct: 2
    },
    {
        question: "14. ¿Qué valor de display centra un bloque horizontalmente con margin: 0 auto?",
        options: ["inline-block", "block", "inline", "flex"],
        correct: 1
    },
    {
        question: "15. ¿Qué atributo permite mostrar texto alternativo mientras se carga una imagen?",
        options: ["alt", "title", "value", "label"],
        correct: 0
    }
],
[
    {
        question: "16. ¿Cuál de los siguientes es un selector de clase válido en CSS?",
        options: ["#main", "h1", ".container", "*main"],
        correct: 2
    },
    {
        question: "17. ¿Qué propiedad se usa para establecer la fuente en CSS?",
        options: [
            "text-family",
            "font-type",
            "font-family",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "18. ¿Qué elemento se utiliza para definir el encabezado de un documento HTML?",
        options: ["<head>", "<title>", "<header>", "<meta>"],
        correct: 0
    },
    {
        question: "19. ¿Qué propiedad se usa para redondear esquinas de un contenedor?",
        options: ["border", "radius", "round-corner", "border-radius"],
        correct: 3
    },
    {
        question: "20. ¿Qué etiqueta se usa para agrupar campos en un formulario?",
        options: ["<input>", "<form>", "<fieldset>", "<group>"],
        correct: 2
    }
],
[
    {
        question: "21. ¿Cuál de estas es mejor funcionalmente para centrar un elemento?",
        options: [
            "margin: 0 auto;",
            "float: none; display: block; text-align: center;",
            "display: block; margin-left: auto; margin-right: auto;",
            "text-align: center;"
        ],
        correct: 2
    },
    {
        question: "22. ¿Qué texto aparece mientras se carga la imagen en este código? <pre>&lt;img src=\"flowers.png\" alt=\"Flowers\" title=\"Carnations\"&gt;</pre>",
        options: ["Flowers", "Carnations", "flowers.png", "image"],
        correct: 0
    },
    {
        question: "23. ¿Qué etiqueta se usa para definir comentarios en HTML?",
        options: [
            "&lt;!-- Comentario --&gt;",
            "// Comentario",
            "# Comentario",
            "&lt;comment&gt;"
        ],
        correct: 0
    },
    {
        question: "24. ¿Qué etiqueta se usa para mostrar el título de la pestaña del navegador?",
        options: ["<title>", "<meta>", "<head>", "<h1>"],
        correct: 0
    },
    {
        question: "25. ¿Qué elemento HTML agrupa navegación principal?",
        options: ["<nav>", "<menu>", "<aside>", "<section>"],
        correct: 0
    }
],
[
    {
        question: "26. ¿Cuál es la forma correcta de anidar etiquetas HTML?",
        options: [
            "&lt;p&gt;&lt;strong&gt;&lt;em&gt;texto&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;",
            "&lt;p&gt;&lt;strong&gt;texto&lt;/strong&gt;&lt;/p&gt;&lt;em&gt;",
            "&lt;p&gt;This is HTML5 &lt;strong&gt;&lt;em&gt;text formatting&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;",
            "&lt;strong&gt;&lt;p&gt;&lt;em&gt;text&lt;/em&gt;&lt;/p&gt;&lt;/strong&gt;"
        ],
        correct: 2
    },
    {
        question: "27. ¿Qué propiedad CSS se usa para definir el tamaño entre caracteres?",
        options: [
            "character-spacing",
            "text-gap",
            "letter-spacing",
            "spacing"
        ],
        correct: 2
    },
    {
        question: "28. ¿Qué propiedad meta permite mostrar resultados en buscadores?",
        options: ["viewport", "description", "title", "content"],
        correct: 3
    },
    {
        question: "29. ¿Qué elemento se usa para indicar que algo es importante?",
        options: ["<div>", "<p>", "<strong>", "<em>"],
        correct: 2
    },
    {
        question: "30. ¿Qué propiedad se utiliza para establecer la opacidad del texto en CSS?",
        options: ["transparency", "alpha", "visible", "opacity"],
        correct: 3
    }
],
[
    {
        question: "31. ¿Qué estilo se aplica si no hay ningún estilo personalizado definido?",
        options: [
            "Estilo insertado",
            "Estilo interno",
            "Estilo externo",
            "Estilo predeterminado del explorador"
        ],
        correct: 3
    },
    {
        question: "32. ¿Qué etiqueta se usa para mostrar una lista ordenada?",
        options: ["<ul>", "<list>", "<ol>", "<menu>"],
        correct: 2
    },
    {
        question: "33. ¿Qué elemento semántico se usa para navegación principal?",
        options: ["<nav>", "<aside>", "<header>", "<footer>"],
        correct: 0
    },
    {
        question: "34. ¿Qué situación causará que una pantalla táctil active varias áreas al mismo tiempo?",
        options: [
            "No está calibrada",
            "Áreas de entrada muy pequeñas",
            "Son semitransparentes",
            "Están demasiado cerca"
        ],
        correct: 3
    },
    {
        question: "35. ¿Qué propiedad de CSS define un contenedor como una cuadrícula?",
        options: [
            "display: grid;",
            "display: block;",
            "display: container;",
            "display: inline-block;"
        ],
        correct: 0
    }
],
[
    {
        question: "36. ¿Cuál es el problema en este código HTML? <code>&lt;body&gt; &lt;html&gt;</code>",
        options: [
            "&lt;nav&gt; no puede contener &lt;ul&gt;",
            "&lt;nav&gt; debe estar en &lt;head&gt;",
            "&lt;nav&gt; está mal posicionado",
            "&lt;body&gt; está antes de &lt;html&gt;"
        ],
        correct: 3
    },
    {
        question: "37. ¿Qué fragmento HTML valida una entrada entre 1 y 100?",
        options: [
            "&lt;input type=\"num\" min=\"1\" max=\"100\"&gt;",
            "&lt;input type=\"positive\" limit=\"100\"&gt;",
            "&lt;input type=\"number\" min=\"1\" max=\"100\"&gt;",
            "&lt;input type=\"number\" low=\"1\" high=\"100\"&gt;"
        ],
        correct: 2
    },
    {
        question: "38. ¿Cuál es el orden correcto del ciclo de vida de una aplicación?",
        options: [
            "Depurar → Validar → Empaquetar → Implementar",
            "Validar → Empaquetar → Escribir código",
            "Escribir código → Validar → Empaquetar → Implementar",
            "Empaquetar → Escribir código → Implementar"
        ],
        correct: 2
    },
    {
        question: "39. ¿Qué propiedad de posición coloca un elemento con respecto al antecesor más cercano?",
        options: ["static", "fixed", "absolute", "relative"],
        correct: 2
    },
    {
        question: "40. ¿Qué atributo HTML muestra controles de audio como Play y Pause?",
        options: [
            "autoplay",
            "preload=\"controls\"",
            "preload=\"auto\"",
            "controls"
        ],
        correct: 3
    }
]
       

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
        
        // Validación básica
        if (userData.name === '' || userData.email === '') {
            alert('Por favor completa todos los campos');
            return;
        }
        
        if (!validateEmail(userData.email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Ocultar registro y mostrar cuestionario
        registrationContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        
        // Mostrar el nombre del usuario en el cuestionario
        document.querySelector('.quiz-container h1').textContent += ` - ${userData.name}`;
        
        // Generar las secciones del cuestionario
        generateQuizSections();
    });

    // Generar las secciones del cuestionario
    function generateQuizSections() {
        quizForm.innerHTML = '';
        
        quizData.forEach((section, sectionIndex) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = `question-section ${sectionIndex === 0 ? 'active' : ''}`;
            sectionElement.dataset.sectionIndex = sectionIndex;
            
            section.forEach((question, questionIndex) => {
                const globalQuestionIndex = (sectionIndex * questionsPerSection) + questionIndex;
                
                const questionElement = document.createElement('div');
                questionElement.className = 'question';
                
                const questionTitle = document.createElement('h3');
                questionTitle.textContent = question.question;
                questionElement.appendChild(questionTitle);
                
                // Manejar diferentes tipos de preguntas
                if (question.type === "code-selection") {
                    // Preguntas de selección de código
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
                                    defaultOption.textContent = `Seleccione ${placeholder}`;
                                    defaultOption.disabled = true;
                                    defaultOption.selected = true;
                                    select.appendChild(defaultOption);
                                    
                                    optionGroup.choices.forEach((choice, idx) => {
                                        const option = document.createElement('option');
                                        option.value = idx;
                                        option.textContent = choice;
                                        select.appendChild(option);
                                    });
                                    
                                    if (userAnswers[globalQuestionIndex] && 
                                        userAnswers[globalQuestionIndex][placeholder] !== undefined) {
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
                else if (question.type === "true-false") {
                    // Preguntas Verdadero/Falso
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'true-false-container';
                    
                    question.options.forEach((option, optionIndex) => {
                        const optionElement = document.createElement('div');
                        optionElement.className = 'tf-option';
                        
                        // Mostrar el código HTML
                        const codeElement = document.createElement('pre');
                        codeElement.className = 'tf-code';
                        codeElement.textContent = option;
                        optionElement.appendChild(codeElement);
                        
                        // Grupo de opciones Verdadero/Falso
                        const tfGroup = document.createElement('div');
                        tfGroup.className = 'tf-radio-group';
                        
                        // Opción Verdadero
                        const trueRadio = document.createElement('input');
                        trueRadio.type = 'radio';
                        trueRadio.name = `q${globalQuestionIndex}_${optionIndex}`;
                        trueRadio.id = `q${globalQuestionIndex}_${optionIndex}_true`;
                        trueRadio.value = 'true';
                        
                        const trueLabel = document.createElement('label');
                        trueLabel.htmlFor = `q${globalQuestionIndex}_${optionIndex}_true`;
                        trueLabel.textContent = 'Verdadero';
                        
                        // Opción Falso
                        const falseRadio = document.createElement('input');
                        falseRadio.type = 'radio';
                        falseRadio.name = `q${globalQuestionIndex}_${optionIndex}`;
                        falseRadio.id = `q${globalQuestionIndex}_${optionIndex}_false`;
                        falseRadio.value = 'false';
                        
                        const falseLabel = document.createElement('label');
                        falseLabel.htmlFor = `q${globalQuestionIndex}_${optionIndex}_false`;
                        falseLabel.textContent = 'Falso';
                        
                        // Agregar elementos al grupo
                        tfGroup.appendChild(trueRadio);
                        tfGroup.appendChild(trueLabel);
                        tfGroup.appendChild(falseRadio);
                        tfGroup.appendChild(falseLabel);
                        
                        // Manejar respuestas existentes
                        if (userAnswers[globalQuestionIndex] && 
                            userAnswers[globalQuestionIndex][`${optionIndex}`] !== undefined) {
                            const userValue = userAnswers[globalQuestionIndex][`${optionIndex}`];
                            if (userValue === 'true') trueRadio.checked = true;
                            if (userValue === 'false') falseRadio.checked = true;
                        }
                        
                        // Event listener para cambios
                        trueRadio.addEventListener('change', () => {
                            if (!userAnswers[globalQuestionIndex]) {
                                userAnswers[globalQuestionIndex] = {};
                            }
                            userAnswers[globalQuestionIndex][`${optionIndex}`] = 'true';
                            updateProgressBar();
                        });
                        
                        falseRadio.addEventListener('change', () => {
                            if (!userAnswers[globalQuestionIndex]) {
                                userAnswers[globalQuestionIndex] = {};
                            }
                            userAnswers[globalQuestionIndex][`${optionIndex}`] = 'false';
                            updateProgressBar();
                        });
                        
                        optionElement.appendChild(tfGroup);
                        optionsContainer.appendChild(optionElement);
                    });
                    
                    questionElement.appendChild(optionsContainer);
                }
                else if (question.type === "matching") {
                    // Preguntas de emparejamiento
                    const matchingContainer = document.createElement('div');
                    matchingContainer.className = 'matching-question-container';
                    
                    const description = document.createElement('p');
                    description.textContent = question.matchingQuestion.description;
                    matchingContainer.appendChild(description);
                    
                    question.matchingQuestion.items.forEach(item => {
                        const itemContainer = document.createElement('div');
                        itemContainer.className = 'matching-item';
                        
                        const leftSide = document.createElement('span');
                        leftSide.className = 'matching-left';
                        leftSide.textContent = item.left;
                        
                        const select = document.createElement('select');
                        select.className = 'matching-select';
                        select.dataset.questionId = globalQuestionIndex;
                        select.dataset.itemId = item.id;
                        
                        const defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = 'Seleccione...';
                        defaultOption.disabled = true;
                        defaultOption.selected = true;
                        select.appendChild(defaultOption);
                        
                        item.rightOptions.forEach((option, idx) => {
                            const optionElement = document.createElement('option');
                            optionElement.value = idx;
                            optionElement.textContent = option;
                            select.appendChild(optionElement);
                        });
                        
                        // Restaurar respuesta si existe
                        if (userAnswers[globalQuestionIndex] && 
                            userAnswers[globalQuestionIndex][item.id] !== undefined) {
                            select.value = userAnswers[globalQuestionIndex][item.id];
                        }
                        
                        // Event listener para cambios
                        select.addEventListener('change', () => {
                            if (!userAnswers[globalQuestionIndex]) {
                                userAnswers[globalQuestionIndex] = {};
                            }
                            userAnswers[globalQuestionIndex][item.id] = select.value;
                            updateProgressBar();
                        });
                        
                        itemContainer.appendChild(leftSide);
                        itemContainer.appendChild(select);
                        matchingContainer.appendChild(itemContainer);
                    });
                    
                    questionElement.appendChild(matchingContainer);
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
                
                // Agregar imagen si existe
                if (question.image) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'question-image-container';
                    
                    const img = document.createElement('img');
                    img.src = question.image;
                    img.alt = 'Imagen de la pregunta';
                    img.className = 'question-image';
                    img.onerror = function() {
                        this.style.display = 'none'; // Oculta la imagen si no carga
                    };
                    
                    imgContainer.appendChild(img);
                    questionElement.appendChild(imgContainer);
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
            
            if (!answer) return; // Pregunta no respondida
            
            if (question.type === "code-selection") {
                // Verificar todos los placeholders en preguntas de código
                const placeholders = question.codeQuestion.options.map(opt => 
                    opt.placeholder.replace(/[\[\]]/g, '')
                );
                const allAnswered = placeholders.every(ph => answer[ph] !== undefined);
                if (allAnswered) answeredQuestions++;
            } 
            else if (question.type === "true-false") {
                // Verificar todas las opciones en preguntas V/F
                const allAnswered = question.options.every((_, optIndex) => 
                    answer[optIndex] !== undefined
                );
                if (allAnswered) answeredQuestions++;
            }
            else if (question.type === "matching") {
                // Verificar todos los items en preguntas de emparejamiento
                const allAnswered = question.matchingQuestion.items.every(item => 
                    answer[item.id] !== undefined
                );
                if (allAnswered) answeredQuestions++;
            }
            else {
                // Preguntas normales
                if (answer !== null) answeredQuestions++;
            }
        });
        
        const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}%`;
    }

    // Actualizar los botones de navegación
    function updateNavigationButtons() {
        prevBtn.disabled = currentSection === 0;
        
        if (currentSection === quizData.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    // Cambiar a una sección específica (FUNCIÓN CRÍTICA CORREGIDA)
    function goToSection(sectionIndex) {
        // Validar límites
        if (sectionIndex < 0 || sectionIndex >= quizData.length) {
            console.error(`Índice de sección inválido: ${sectionIndex}`);
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
            
            // Desplazar al inicio de la sección
            newSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error(`No se encontró el elemento de la sección ${sectionIndex}`);
        }
    }

    // Calcular el puntaje
    function calculateScore() {
        const allQuestions = quizData.flat();
        let score = 0;
        
        userAnswers.forEach((answer, index) => {
            const question = allQuestions[index];
            
            if (question.type === "code-selection") {
                // Pregunta de código
                let allCorrect = true;
                question.codeQuestion.options.forEach(opt => {
                    const placeholder = opt.placeholder.replace(/[\[\]]/g, '');
                    if (!answer || answer[placeholder] === undefined || answer[placeholder] !== opt.correct) {
                        allCorrect = false;
                    }
                });
                if (allCorrect) score++;
            } 
            else if (question.type === "true-false") {
                // Pregunta Verdadero/Falso
                let allCorrect = true;
                
                question.options.forEach((_, optionIndex) => {
                    const userValue = answer ? answer[`${optionIndex}`] : undefined;
                    const isActuallyTrue = question.correct.includes(optionIndex);
                    
                    if ((userValue === 'true' && !isActuallyTrue) || 
                        (userValue === 'false' && isActuallyTrue)) {
                        allCorrect = false;
                    }
                });
                
                if (allCorrect) score++;
            }


                    


            else if (question.type === "matching") {
                // Pregunta de emparejamiento
                let allCorrect = true;
                
                question.matchingQuestion.items.forEach(item => {
                    const userChoice = answer ? answer[item.id] : undefined;
                    if (userChoice === undefined || userChoice != item.correctRight) {
                        allCorrect = false;
                    }
                });
                
                if (allCorrect) score++;
            }



            
            else {
                // Pregunta normal
                if (answer !== null && answer === question.correct) {
                    score++;
                }
            }
        });
        
        return score;
    }

    // Mostrar resultados
    function showResults() {
        const score = calculateScore();
        const totalQuestions = quizData.flat().length;
        const allQuestions = quizData.flat();
        
        // Ocultar cuestionario y mostrar resultados
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // Mostrar datos del usuario y puntuación
        scoreDisplay.innerHTML = `
            <p><strong>Participante:</strong> ${userData.name}</p>
            <p><strong>Correo:</strong> ${userData.email}</p>
            <p><strong>Puntuación:</strong> ${score} de ${totalQuestions} puntos (${Math.round((score / totalQuestions) * 100)}%)</p>
        `;
        
        // Mostrar respuestas correctas
        const answersContainer = document.getElementById('correct-answers-container');
        answersContainer.innerHTML = '<h3>Detalle de respuestas:</h3>';
        
        allQuestions.forEach((question, index) => {
            const answerElement = document.createElement('div');
            const userAnswer = userAnswers[index];
            
            // Determinar si la respuesta es correcta
            let isCorrect = false;
            if (question.type === "code-selection") {
                isCorrect = isCodeAnswerCorrect(question, userAnswer);
            } 
            else if (question.type === "true-false") {
                isCorrect = isTrueFalseAnswerCorrect(question, userAnswer);
            }
            else if (question.type === "matching") {
                isCorrect = isMatchingAnswerCorrect(question, userAnswer);
            }
            else {
                isCorrect = userAnswer === question.correct;
            }
            
            answerElement.className = `correct-answer ${isCorrect ? 'correct' : 'incorrect'}`;
            
            const questionText = document.createElement('h4');
            questionText.textContent = `Pregunta ${index + 1}: ${question.question}`;
            answerElement.appendChild(questionText);
            
            if (question.type === "code-selection") {
                // Mostrar código del usuario
                const userCode = document.createElement('div');
                userCode.className = 'user-code';
                userCode.innerHTML = `<strong>Tu código:</strong><br>${formatCodeAnswer(question, userAnswer)}`;
                answerElement.appendChild(userCode);
                
                // Mostrar código correcto
                const correctCode = document.createElement('div');
                correctCode.className = 'correct-code';
                correctCode.innerHTML = `<strong>Código correcto:</strong><br>${formatCodeAnswer(question, getCorrectCodeAnswer(question))}`;
                answerElement.appendChild(correctCode);
            } 
            else if (question.type === "true-false") {
                // Mostrar resultados de verdadero/falso
                const resultsList = document.createElement('div');
                resultsList.className = 'tf-results';
                
                question.options.forEach((option, optionIndex) => {
                    const optionResult = document.createElement('div');
                    optionResult.className = 'tf-option-result';
                    
                    const userValue = userAnswer ? userAnswer[`${optionIndex}`] : undefined;
                    const isActuallyTrue = question.correct.includes(optionIndex);
                    const isOptionCorrect = (userValue === 'true' && isActuallyTrue) || 
                                          (userValue === 'false' && !isActuallyTrue);
                    
                    const codePreview = document.createElement('pre');
                    codePreview.textContent = option;
                    
                    const userChoice = document.createElement('span');
                    userChoice.className = 'user-choice';
                    userChoice.textContent = `Tu respuesta: ${userValue || 'No respondido'}`;
                    
                    const correctMark = document.createElement('span');
                    correctMark.className = isOptionCorrect ? 'correct-mark' : 'incorrect-mark';
                    correctMark.textContent = isOptionCorrect ? '✓' : '✗';
                    
                    const correctAnswer = document.createElement('span');
                    correctAnswer.className = 'correct-answer';
                    correctAnswer.textContent = `Respuesta correcta: ${isActuallyTrue ? 'Verdadero' : 'Falso'}`;
                    
                    optionResult.appendChild(codePreview);
                    optionResult.appendChild(document.createElement('br'));
                    optionResult.appendChild(correctMark);
                    optionResult.appendChild(userChoice);
                    optionResult.appendChild(document.createElement('br'));
                    optionResult.appendChild(correctAnswer);
                    
                    resultsList.appendChild(optionResult);
                });
                
                answerElement.appendChild(resultsList);
            }
            else if (question.type === "matching") {
                // Mostrar resultados de emparejamiento
                const resultsList = document.createElement('div');
                resultsList.className = 'matching-results';
                
                question.matchingQuestion.items.forEach(item => {
                    const itemResult = document.createElement('div');
                    itemResult.className = 'matching-item-result';
                    
                    const userChoice = userAnswer ? userAnswer[item.id] : undefined;
                    const isOptionCorrect = userChoice == item.correctRight;
                    
                    const leftSide = document.createElement('span');
                    leftSide.className = 'matching-left';
                    leftSide.textContent = item.left;
                    
                    const userAnswerSpan = document.createElement('span');
                    userAnswerSpan.className = 'user-answer';
                    userAnswerSpan.textContent = `Tu respuesta: ${userChoice !== undefined ? 
                        question.matchingQuestion.items[0].rightOptions[userChoice] : 'No respondido'}`;
                    
                    const correctMark = document.createElement('span');
                    correctMark.className = isOptionCorrect ? 'correct-mark' : 'incorrect-mark';
                    correctMark.textContent = isOptionCorrect ? '✓' : '✗';
                    
                    const correctAnswer = document.createElement('span');
                    correctAnswer.className = 'correct-answer';
                    correctAnswer.textContent = `Respuesta correcta: ${item.correctRight}`;
                    
                    itemResult.appendChild(leftSide);
                    itemResult.appendChild(document.createElement('br'));
                    itemResult.appendChild(correctMark);
                    itemResult.appendChild(userAnswerSpan);
                    itemResult.appendChild(document.createElement('br'));
                    itemResult.appendChild(correctAnswer);
                    
                    resultsList.appendChild(itemResult);
                });
                
                answerElement.appendChild(resultsList);
            }
            else {
                // Pregunta normal
                const userAnswerText = document.createElement('p');
                if (userAnswer !== null) {
                    userAnswerText.innerHTML = `<span class="user-answer">Tu respuesta:</span> ${question.options[userAnswer]}`;
                } else {
                    userAnswerText.innerHTML = `<span class="user-answer">No respondiste esta pregunta</span>`;
                }
                answerElement.appendChild(userAnswerText);
                
                const correctAnswerText = document.createElement('p');
                correctAnswerText.innerHTML = `<span class="correct-option">Respuesta correcta:</span> ${question.options[question.correct]}`;
                answerElement.appendChild(correctAnswerText);
            }
            
            // Mostrar explicación si existe
            if (question.explanation) {
                const explanation = document.createElement('div');
                explanation.className = 'explanation';
                explanation.innerHTML = question.explanation;
                answerElement.appendChild(explanation);
            }
            
            answersContainer.appendChild(answerElement);
        });
        
        // Guardar resultados
        saveResults(score, totalQuestions);
    }

    // Función auxiliar para verificar respuestas de código
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

    // Función auxiliar para verificar respuestas verdadero/falso
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

    // Función auxiliar para verificar respuestas de emparejamiento
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

    // Función auxiliar para formatear respuestas de código
    function formatCodeAnswer(question, answers) {
        if (!answers) return "No respondido";
        
        let code = question.codeQuestion.template;
        question.codeQuestion.options.forEach(opt => {
            const placeholder = opt.placeholder;
            const placeholderKey = placeholder.replace(/[\[\]]/g, '');
            const answerIndex = answers[placeholderKey];
            const choice = answerIndex !== undefined ? opt.choices[answerIndex] : "[No respondido]";
            code = code.replace(placeholder, choice);
        });
        return code.replace(/\n/g, '<br>');
    }

    // Función auxiliar para obtener respuestas correctas de código
    function getCorrectCodeAnswer(question) {
        const correctAnswers = {};
        question.codeQuestion.options.forEach(opt => {
            const placeholder = opt.placeholder.replace(/[\[\]]/g, '');
            correctAnswers[placeholder] = opt.correct;
        });
        return correctAnswers;
    }

    // Función para guardar resultados
    function saveResults(score, totalQuestions) {
        const results = {
            user: userData,
            date: new Date().toLocaleString(),
            score: score,
            totalQuestions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            answers: userAnswers
        };
        
      console.log(`Section ${sectionIndex}, Question ${questionIndex} -> Global ${globalQuestionIndex}`)
    }

    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        goToSection(currentSection - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSection(currentSection + 1);
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showResults();
    });

    restartBtn.addEventListener('click', () => {
        // Reiniciar el cuestionario
        userAnswers = Array(quizData.flat().length).fill(null);
        currentSection = 0;
        quizContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
        generateQuizSections();
    });
});