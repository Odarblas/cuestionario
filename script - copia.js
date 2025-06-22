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
        // Sección 1 (índice 0)
        [
            {
                question: "1. ¿Qué dos fragmentos de código HTML5 reproducen un vídeo automáticamente al cargarse la página?",
                options: [
                    "<video src=\"myVideo.ogg\" width=\"320\" height=\"320\" preload=\"auto\">", 
                    "<video src=\"myVideo.og8\" width=\"320\" height=\"320\" controls>",
                    "<video src=\"myVideo.OBR\" width=\"320\" height=\"320\" controls autoplay>", 
                    "<video src=\"myVideo.ogg\" width=\"320\" height=\"320\" autoplay>"
                ],
                correct: 3
            },
            {
                question: "2. Está creando un sitio web y quiere tener tres vínculos llamados Inicio, Información del producto y Contacto. ¿Qué selector debe usar?",
                options: ["#main", "a[name=\"main\"]", ".main", "a#main"],
                correct: 2
            },
            {
                question: "3. ¿Qué segmento de código establece el fondo de un párrafo en blue (azul) con un red border (borde rojo)?",
                options: ["p{background-color: blue; border-color: 10px outset red;}", 
                    "p(background-color = blue;border = 10px outset red;}", 
                    "p{background-color: blue;border: 10px outset red;}", 
                    "p (background-colon: blue;border-color: 10px red;}"],
                correct: 2
            },
            {
                question: "4. ¿Qué etiqueta se usa para crear una lista desplegable en HTML5?",
                options: ["<fieldset>", "<select>", "<option>", "<textarea>"],
                correct: 1
            },
            {
                question: "5. Complete el código HTML para que la imagen clients.gif enlace a clients.html en nueva ventana:",
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
                },
                type: "code-selection"
            }
        ],
        // Sección 2 (índice 1)
        [
            {
                question: `6. Analiza el siguiente código HTML/CSS:
            <body>\n
        <h1 style=”color:navy”>Learning CSS</h1>\n
        <ul>\n
        <li style=”color:blue”>Inline Styles</li>\n
        <li style=”color:blue”>Internal Styles</li>\n
        <li style=”color:blue”>External Stylesc/li>\n
        </ul>\n
        </body>

    ¿Cuál es el principal problema de este código?`,
                options: [
                    "El estilo de color especificado para el elemento <h1> debe moverse a una hoja de estilos",
                    "El codigo CSS se ajusta a las prácticas recomendadas del sector",
                    "Elestilo de color espeaificado para los elementos <li> debe moverse a una hoja de estilos",
                    "El estlo de color de los elementos <li> debe transferirse al elemento <body>"
                ],
                correct: 2
            },
            {
                question: `7. Analice el siguiente marcado:
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <style>
        P {color:purple;}
        </style>
        </head>
        <body>
        <p style= color:red; text- decorat ion :underline;"">First paragraph</p>
        </body>
        </html>

    ¿Dada la hoja de estilos interna y el estilo insertado proporcionados, qué afirmación es verdadera?`,
                options: [
                    "El texto\"First paragraph\" aparece en morado y sin subrayar.",
                    "El texto \"First paragraph\" aparecerá en morado y subrayado.",
                    "El texto \"First paragraph\" aparecerá en rojo y sin subrayar.",
                    "El texto \"First paragraph\" aparecerá en rojo y subrayado."
                ],
                correct: 3
            },
            {
                question: "8.¿Un elemento debe mantener su ubicación en la ventanilla aunque se desplace la página. ¿Qué valor de la propiedad `position` de CSS debe usar?",
                options: ["position: absolute;", "position: fixed;", "position: relative;", "position: static;"],
                correct: 1
            },
            {
                question: "9.¿Qué fragmento de códiggo HTML5 muestra una forma de validad si una entrada númerica tiene un valor comprendido entre 1 y 10, ambos inclusive?",
                options: ["<input type=\"num\" min=\"1\" max=\"100\">", 
                    "<input type=\"positive\" limit=\"100\">",
                    "<input type=\"number\" min=\"1\" max=\"100\">", 
                    "<input type=\"number\" low=\"1\" high=\"100\">"],
                correct: 0
            },
            {
                question: "10. ¿Cual es el valor predeterminado de la propiedad \"psition\" de CSS?",
                options: ["relative", "absolute", "fixed", "static"],
                correct: 3
            }
        ],
        // Sección 3 (índice 2)
        [
            {
                question: `11. Estas diseñando un sitio web para Sunset Web.:
             Escribe el siguiente marcado.
             <!DOCTYPE html>
            <html lang="en">
            <head>
            <title>Sunset web</title>
            </head>
            <body>
            <p>Welcome to Sunset web.</p>
            </body>
            </html>
            ¿Qué estilo se usará para presentar el código?`,
                options: [
                    "Un estilo insertado",
                    "Un estilo externo",
                    "Un estilo interno",
                    "El estilo predeterminado del explorador"
                ],
                correct: 3
            },
            {
                question: `12. Complete el estilo CSS para un párrafo con doble interlineado y 5px entre letras:`,
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
                type: "code-selection",
                explanation: `La solución correcta es:<br><br>
                <strong>line-height: 2em;</strong> → Para doble espacio entre líneas<br>
                <strong>letter-spacing: 5px;</strong> → Para espacio entre caracteres`
            },
            {
                question: "13. De los siguientes segmentos de código, seleccione Verdadero si el elemento HTML debe ir dentro del bloque <head>. En caso contrario, seleccione Falso.",
                options: [
                    "<style>h1{color:red;}</style>",
                    "<title>Contact Information</title>",
                    "<link rel='stylesheet' href='default.css' />",
                    "<h1>Welcome</h1>",
                    "<!DOCTYPE html>"
                ],
                correct: [1, 2], // Índices de las opciones correctas (title y link)
                type: "true-false",
                explanation: "✅ <strong>Respuestas correctas:</strong><br>" +
                            "- &lt;title&gt; debe ir en &lt;head&gt; (Verdadero)<br>" +
                            "- &lt;link&gt; para CSS debe ir en &lt;head&gt; (Verdadero)<br>" +
                            "- &lt;style&gt; puede ir en &lt;head&gt; o &lt;body&gt; (Contextual)<br>" +
                            "- &lt;h1&gt; y &lt;!DOCTYPE&gt; no van en &lt;head&gt; (Falso)"
            },
            {
                question: "14. ¿Qué método JavaScript se usa para seleccionar un elemento por su ID?",
                options: ["document.query()", "getElementById()", "selectId()", "findElement()"],
                correct: 1
            },
            {
                question: "15.¿Qué código muestra la forma correcta de anidar etiquetas en html5?",
                options: [
                    "<p>This is HTML5<strong><em>text formatting</p></em></strong>",
                    "<p>This is HTML5<strong><em>text formatting</p></strong></em>",
                    "<p>This is HTML5<strong><em>text formatting</em></strong></p>",
                    "<p>This is HTML5<strong><em>text formatting</strong></em></p>"
                ],
                correct: 2
            }
        ],
        // Sección 4 (índice 3)
        [
            {
                question: "16. Esta creando una página HTML donde se proporcionan instrucciones para subir al Everest. ¿Qué etiquetas completan la imagen para la página de muestra?",
                image: 'images/pregunta25.jpg',
                options: [
                    "<nav></nav><figcaption></figcaption><figure></figure>",
                    "<header></header><figcaption></figcaption><figure></figure>",
                    "<nav></nav><table></table><figure></figure>",
                    "<table></table><figcaption></figcaption><header></header>"
                ],
                correct: 0
            },
            {
                question: `17. Tienes que programar un juego en el que aparecerá un video promocional. El video va a estar disponible en los formatos mp4 y webm. El formato mp4 tendrá mayor prioridad. Los archivos multimedia están guardados en la subcarpeta. Cuál es el código correcto:
                Completa el código seleccionando las opciones correctas:`,
                codeQuestion: {
                    template: `<video [1]="320" [2]="240" [3]>\n    <source [4]="[5]/AWpromo.mp4" [6]="[7]">\n    <source [8]="[9]/AWpromo.webm" [10]="[11]">\n    <track [12]="English" [13]="subtitles" [14]="en" [15]="[16]/AWpromo-en.vtt" [17]>\n    Tu navegador no soporta el elemento de video.\n</video>`,
                    options: [
                        {
                            placeholder: "[1]",
                            choices: ['width', 'size', 'dimension', 'w'],
                            correct: 0
                        },
                        {
                            placeholder: "[2]",
                            choices: ['height', 'h', 'size', 'length'],
                            correct: 0
                        },
                        {
                            placeholder: "[3]",
                            choices: ['controls', 'controller', 'player', 'control'],
                            correct: 0
                        },
                        {
                            placeholder: "[4]",
                            choices: ['src', 'source', 'file', 'media'],
                            correct: 0
                        },
                        {
                            placeholder: "[5]",
                            choices: ['video', 'videos', 'media', 'assets'],
                            correct: 0
                        },
                        {
                            placeholder: "[6]",
                            choices: ['type', 'format', 'media-type', 'codec'],
                            correct: 0
                        },
                        {
                            placeholder: "[7]",
                            choices: ['video/mp4', 'video/webm', 'mp4/video', 'media/mp4'],
                            correct: 0
                        },
                        {
                            placeholder: "[8]",
                            choices: ['src', 'source', 'file', 'media'],
                            correct: 0
                        },
                        {
                            placeholder: "[9]",
                            choices: ['video', 'videos', 'media', 'assets'],
                            correct: 0
                        },
                        {
                            placeholder: "[10]",
                            choices: ['type', 'format', 'media-type', 'codec'],
                            correct: 0
                        },
                        {
                            placeholder: "[11]",
                            choices: ['video/webm', 'video/mp4', 'webm/video', 'media/webm'],
                            correct: 0
                        },
                        {
                            placeholder: "[12]",
                            choices: ['label', 'title', 'name', 'description'],
                            correct: 0
                        },
                        {
                            placeholder: "[13]",
                            choices: ['kind', 'type', 'role', 'format'],
                            correct: 0
                        },
                        {
                            placeholder: "[14]",
                            choices: ['srclang', 'lang', 'language', 'slang'],
                            correct: 0
                        },
                        {
                            placeholder: "[15]",
                            choices: ['src', 'file', 'source', 'track'],
                            correct: 0
                        },
                        {
                            placeholder: "[16]",
                            choices: ['video', 'videos', 'subtitles', 'tracks'],
                            correct: 0
                        },
                        {
                            placeholder: "[17]",
                            choices: ['default', 'autoshow', 'active', 'selected'],
                            correct: 0
                        }
                    ]
                },
                type: "code-selection",
                explanation: `El código correcto debe:<br>
                <ul>
                    <li>Dar prioridad al MP4 sobre WebM</li>
                    <li>Incluir todos los atributos requeridos (width, height, controls)</li>
                    <li>Referenciar correctamente los archivos en la subcarpeta "video/"</li>
                    <li>Usar los tipos MIME adecuados (video/mp4, video/webm)</li>
                    <li>Implementar correctamente los subtítulos</li>
                </ul>`
            },
            {
                question: "18. Tienes que aplicar un borde grueso doble de color rojo con esquinas redondeadas de 20 pixeles en el texto del titulo 1. Completa el estilo CSS seleccionando la opción correcta.",
                options: ["<style>h1{border: thick dotted red; border:20px;}</style>", 
                    "<style>h1{border:thin red; border-style:20px;}</style>", 
                    "<style>h1{border: thick double red}</style>", 
                    "<style>h1{border: thick double red; border-radius:20px;}</style>"],
                correct: 3
            },
            {
                question: `19. Estas elaborando una página web para su compañía. La página debe tener capacidad de respuesta suficiente para que pueda verse en exploradores de equipos móviles y de escritorio.
                •	En los exploradores de los equipos móviles cuyo ancho de pantalla sea, como mínimo de 768 pixeles, debe aparecer una imagen de fondo de bienvenida llamada NormalLogo.png.
                •	En los demás exploradores debe aparecer una imagen de fondo de bienvenida llamada SmallLogo.png
                Completa el marcado seleccionando la opción correcta en cada lista desplegable.`,
                codeQuestion: {
                    template: `[1] welcome {\n    background-image: [2]("SmallLogo.png");\n}\n\n@media only screen and ([3]: [4]px) {\n    [5] welcome {\n        background-image: [6]("NormalLogo.png");\n    }\n}`,
                    options: [
                        {
                            placeholder: "[1]",
                            choices: ['.', '#', '@', '&'],
                            correct: 0
                        },
                        {
                            placeholder: "[2]",
                            choices: ['url', 'image', 'src', 'link'],
                            correct: 0
                        },
                        {
                            placeholder: "[3]",
                            choices: ['min-width', 'max-width', 'width', 'screen-width'],
                            correct: 0
                        },
                        {
                            placeholder: "[4]",
                            choices: ['768', '480', '1024', '320'],
                            correct: 0
                        },
                        {
                            placeholder: "[5]",
                            choices: ['.', '#', '@', '&'],
                            correct: 0
                        },
                        {
                            placeholder: "[6]",
                            choices: ['url', 'image', 'src', 'link'],
                            correct: 0
                        }
                    ]
                },
                type: "code-selection",
                explanation: `El código correcto debe:
                            <ul>
                        <li>Usar <code>.welcome</code> para seleccionar el elemento</li>
                        <li>Emplear <code>url()</code> para especificar imágenes de fondo</li>
                        <li>Usar <code>min-width: 768px</code> como condición para el cambio</li>
                        <li>Mostrar la imagen pequeña (<strong>SmallLogo.png</strong>) por defecto</li>
                        <li>Cambiar a la imagen normal (<strong>NormalLogo.png</strong>) en pantallas grandes</li>
                    </ul>
                    <strong>Solución correcta:</strong>
                    <pre><code>.welcome {
                    background-image: url("SmallLogo.png");
                }

                @media only screen and (min-width: 768px) {
                    .welcome {
                        background-image: url("NormalLogo.png");
                    }
                }</code></pre>`
            },
            {
                question: "20. Quieres aplicar un estilo a todos los elementos del documento, ¿Qué selector de tipo debes usar?",
                options: ["+", ":", "}", "*"],
                correct: 3
            }
        ],
        // Sección 5 (índice 4)
        [
            {
                question: `21. Necesitas mostrar una imagen diferente para diferentes tamaños de pantalla. Completa el marcado HTML5 seleccionando las opciones correctas:`,
                codeQuestion: {
                    template: `<picture>\n    <source media="([1]: [2]px)" [3]="[4]">\n    <source media="([5]: [6]px)" [7]="[8]">\n    <img [9]="[10]" alt="[11]" style="[12]: [13];">\n</picture>`,
                    options: [
                        // Primer source
                        {
                            placeholder: "[1]",
                            choices: ['min-width', 'max-width', 'width', 'device-width'],
                            correct: 0
                        },
                        {
                            placeholder: "[2]",
                            choices: ['1000', '768', '1200', '992'],
                            correct: 0
                        },
                        {
                            placeholder: "[3]",
                            choices: ['srcset', 'src', 'source', 'imageset'],
                            correct: 0
                        },
                        {
                            placeholder: "[4]",
                            choices: ['family-large.jpg', 'family-medium.jpg', 'family-small.jpg', 'large-family.jpg'],
                            correct: 0
                        },
                        
                        // Segundo source
                        {
                            placeholder: "[5]",
                            choices: ['min-width', 'max-width', 'width', 'device-width'],
                            correct: 0
                        },
                        {
                            placeholder: "[6]",
                            choices: ['700', '600', '480', '768'],
                            correct: 0
                        },
                        {
                            placeholder: "[7]",
                            choices: ['srcset', 'src', 'source', 'imageset'],
                            correct: 0
                        },
                        {
                            placeholder: "[8]",
                            choices: ['family-medium.jpg', 'family-large.jpg', 'family-small.jpg', 'medium-family.jpg'],
                            correct: 0
                        },
                        
                        // Img fallback
                        {
                            placeholder: "[9]",
                            choices: ['src', 'srcset', 'source', 'img-src'],
                            correct: 0
                        },
                        {
                            placeholder: "[10]",
                            choices: ['family-small.jpg', 'family-medium.jpg', 'family-large.jpg', 'small-family.jpg'],
                            correct: 0
                        },
                        {
                            placeholder: "[11]",
                            choices: ['Familia feliz reunida', 'Foto familiar', 'Familia', 'Reunión familiar'],
                            correct: 0
                        },
                        {
                            placeholder: "[12]",
                            choices: ['width', 'height', 'size', 'max-width'],
                            correct: 0
                        },
                        {
                            placeholder: "[13]",
                            choices: ['auto', '100%', '100vw', 'inherit'],
                            correct: 0
                        }
                    ]
                },
                type: "code-selection",
                explanation: `El código correcto implementa:<br>
                <ul>
                    <li><strong>Imagen grande</strong> para pantallas ≥1000px</li>
                    <li><strong>Imagen mediana</strong> para pantallas ≥700px</li>
                    <li><strong>Imagen pequeña</strong> como fallback/default</li>
                    <li>Atributo <code>srcset</code> para los sources</li>
                    <li>Atributo <code>src</code> para el fallback</li>
                    <li>Texto alternativo descriptivo</li>
                    <li>Estilo para mantener proporciones originales</li>
                </ul>
                <strong>Solución completa:</strong>
                <pre><code>&lt;picture&gt;
                &lt;source media="(min-width: 1000px)" srcset="family-large.jpg"&gt;
                &lt;source media="(min-width: 700px)" srcset="family-medium.jpg"&gt;
                &lt;img src="family-small.jpg" alt="Familia feliz reunida" style="width: auto;"&gt;
            &lt;/picture&gt;</code></pre>`
            },
            {
                question: "22.¿Qué segmento de código correctamente el fondo de una imagen cuyo tamaño se ajusta para llenar todo el fondo?",
                options: ["#div1{background:img(flower.jpg) ;background-size: 200px;}",
                    "#div1{ background:url(flower.jpg) ;background-size: auto;}", 
                    "#div1{background:img(flower.jpg) ;background-size: contain;}", 
                    "#div1{background:url(flower.jpg) ;background-size: cover;}"],
                correct: 3
            },
            {
                question: `23. Complete el pseudocódigo CSS para los estados de los vínculos según estos comportamientos:`,
                matchingQuestion: {
                    description: `Relacione cada pseudoclase CSS con el color que debe aplicar:`,
                    items: [
                        {
                            id: 1,
                            left: 'a:link',
                            rightOptions: ['red', 'green', 'orange', 'blue'],
                            correctRight: 'red',
                            explanation: 'a:link = color inicial (rojo)'
                        },
                        {
                            id: 2,
                            left: 'a:visited',
                            rightOptions: ['red', 'green', 'orange', 'blue'],
                            correctRight: 'blue',
                            explanation: 'a:visited = enlace visitado (azul)'
                        },
                        {
                            id: 3,
                            left: 'a:hover',
                            rightOptions: ['red', 'green', 'orange', 'blue'],
                            correctRight: 'orange',
                            explanation: 'a:hover = cursor sobre el enlace (naranja)'
                        },
                        {
                            id: 4,
                            left: 'a:active',
                            rightOptions: ['red', 'green', 'orange', 'blue'],
                            correctRight: 'green',
                            explanation: 'a:active = al hacer clic (verde)'
                        }
                    ],
                    correctOrder: [1, 4, 3, 2] // Orden correcto: link, active, hover, visited
                },
                type: "matching",
                explanation: `El orden CORRECTO de las pseudoclases CSS es:
                        <ol>
                    <li><strong>a:link</strong> {color: red;} → Estado inicial</li>
                    <li><strong>a:active</strong> {color: green;} → Al hacer clic</li>
                    <li><strong>a:hover</strong> {color: orange;} → Al pasar el cursor</li>
                    <li><strong>a:visited</strong> {color: blue;} → Después de visitado</li>
                </ol>
                <strong>Regla mnemotécnica:</strong> "LoVe HAte" (Link, Visited, Hover, Active)`
            },
            {
                question: "24.¿Qué segmento de código mostrara los controles Play (reproducir) y Pause en la interfaz?",
                options: ["<audio autoplay>", 
                "<audio preload=\”controls\”>",
                "<audio preload=\”auto\”>",
                "<audio controls>"],
                correct: 3
            },
            {
    question: `25. Tiene que mostrar una imagen de un logotipo de HTML5 en una de sus paginas web. Si la pagina tarda en aparecer, debe mostrar el texto "HTML5 icon" mientras se carga la imagen. Complete el marcado seleccionando la opción correcta en cada lista desplegable:`,
    codeQuestion: {
        template: `<[1] [2]="html5.gif" [3]="[4]" [5]="[6]">`,
        options: [
            {
                placeholder: "[1]",
                choices: ['<img>', '<image>', '<picture>', '<logo>'],
                correct: 0,
                explanation: "La etiqueta correcta para imágenes en HTML es <img>"
            },
            {
                placeholder: "[2]",
                choices: ['src', 'source', 'href', 'file'],
                correct: 0,
                explanation: "El atributo 'src' especifica la ruta de la imagen"
            },
            {
                placeholder: "[3]",
                choices: ['alt', 'title', 'description', 'text'],
                correct: 0,
                explanation: "El atributo 'alt' provee texto alternativo para la imagen"
            },
            {
                placeholder: "[4]",
                choices: [
                    'HTML5 Icon', 
                    'Logo HTML5', 
                    'Imagen de HTML5', 
                    'Icono de HTML5'
                ],
                correct: 0,
                explanation: "Debe coincidir exactamente con el texto solicitado"
            },
            {
                placeholder: "[5]",
                choices: ['width', 'size', 'height', 'dimension'],
                correct: 0,
                explanation: "'width' define el ancho de la imagen en píxeles"
            },
            {
                placeholder: "[6]",
                choices: ['128', '64', '256', '512'],
                correct: 0,
                explanation: "El ancho especificado en el ejemplo es 128 píxeles"
            }
        ]
    },
        type: "code-selection",
        explanation: `El código HTML correcto para mostrar una imagen con texto alternativo es:<br><br>
        <strong>&lt;img src="html5.gif" alt="HTML5 Icon" width="128"&gt;</strong><br><br>
        Donde:<br>
        - <strong>src</strong>: especifica la ruta de la imagen<br>
        - <strong>alt</strong>: provee texto alternativo para accesibilidad y mientras carga<br>
        - <strong>width</strong>: define el ancho de la imagen`

            }
        ],
        // Sección 6 (índice 5)
        [
            {
                question: "26. ¿cual es la sintaxis para cambiar el color de la fuente de un vínculo visitado a magenta?",
                options: ["a.link{color: magenta;}", 
                    "a:visited{color: magenta;}",
                    "a#link{color: magenta;}", 
                    "a:visited{color= magenta;}"],
                correct: 1
            },
            {
                question: `27. Necesita asegurarse de que el valor de un elemento input es un número de teléfono de 10 dígitos válido sin símbolos. El elemento input debe mostrarse inicialmente como todos ceros, pero el valor no debe almacenarse nunca con el formulario. Complete el marcado seleccionando la opción correcta en cada lista desplegable:`,
    codeQuestion: {
        template: `<input [1]="phone" [2]="[0-9]{10}" [3]="0000000000" [4]>`,
        options: [
            {
                placeholder: "[1]",
                choices: ['id', 'name', 'class', 'type'],
                correct: 0,
                explanation: "'id' identifica únicamente el elemento para JavaScript/CSS"
            },
            {
                placeholder: "[2]",
                choices: ['pattern', 'regex', 'validate', 'format'],
                correct: 0,
                explanation: "El atributo 'pattern' define una expresión regular para validación"
            },
            {
                placeholder: "[3]",
                choices: ['placeholder', 'value', 'default', 'init'],
                correct: 0,
                explanation: "'placeholder' muestra texto temporal sin afectar el valor real"
            },
            {
                placeholder: "[4]",
                choices: [
                    'autocomplete="off"', 
                    'required', 
                    'novalidate', 
                    'type="tel"'
                ],
                correct: 0,
                explanation: "autocomplete='off' previene que el navegador almacene el valor"
            }
        ]
    },
    type: "code-selection",
            },
            {
                question: `28. Mueva los atributos adecuados de la lista de la izquierda hasta las descripciones correctas de la derecha. Cada atributo se puede usar una vez, más de una vez o ninguna vez.`,
            type: "matching",
            matchingQuestion: {
                description: `Relacione cada atributo HTML con su descripción correcta:`,
                items: [
            {
                id: 1,
                left: 'maxlength',
                rightOptions: [
                    'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                    'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                    'Proporciona una forma de establecer elementos como obligatorios',
                    'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                    'Establece el número máximo de caracteres permitidos en un campo de entrada'
                ],
                correctRight: 'Establece el número máximo de caracteres permitidos en un campo de entrada',
                explanation: 'maxlength limita la cantidad de caracteres (ej: maxlength="10")'
            },
            {
                id: 2,
                left: 'multiple',
                rightOptions: [
                    'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                    'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                    'Proporciona una forma de establecer elementos como obligatorios',
                    'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                    'Establece el número máximo de caracteres permitidos en un campo de entrada'
                ],
                correctRight: 'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                explanation: 'multiple permite selecciones múltiples en inputs de tipo file/email'
            },
            {
                id: 3,
                left: 'pattern',
                rightOptions: [
                    'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                    'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                    'Proporciona una forma de establecer elementos como obligatorios',
                    'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                    'Establece el número máximo de caracteres permitidos en un campo de entrada'
                ],
                correctRight: 'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                explanation: 'pattern define una regex para validación (ej: pattern="[A-Za-z]{3}")'
            },
            {
                id: 4,
                left: 'placeholder',
                rightOptions: [
                    'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                    'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                    'Proporciona una forma de establecer elementos como obligatorios',
                    'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                    'Establece el número máximo de caracteres permitidos en un campo de entrada'
                ],
                correctRight: 'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                explanation: 'placeholder muestra texto temporal (ej: placeholder="Ej: 555-1234")'
            },
            {
                id: 5,
                left: 'required',
                rightOptions: [
                    'Proporciona una forma de establecer una expresión regular con la que el valor debe coincidir',
                    'Proporciona una forma de establecer el texto predeterminado hasta que el foco se coloca en un elemento',
                    'Proporciona una forma de establecer elementos como obligatorios',
                    'Proporciona una forma de permitir más de un archivo o dirección de correo electrónico en una entrada',
                    'Establece el número máximo de caracteres permitidos en un campo de entrada'
                ],
                correctRight: 'Proporciona una forma de establecer elementos como obligatorios',
                explanation: 'required fuerza al usuario a completar el campo antes de enviar'
            }
            ],
                correctOrder: [3, 2, 5, 4, 1] // Orden correcto: pattern, multiple, required, placeholder, maxlength
             },
            },
            {
                question: "29.¿Cuál es el efecto de aplicar la propiedad de CSS \"float:right\" a una imagen?",
                options: ["Coloca una imagen a la derecha y ajuste el texto en las partes superior izquierda",
                "Coloca la imagen a la izquierda de la región y ajusta el texto en la parte superior, derecha e interior", 
                "Coloca la imagen a la izquierda y muestra todo el texto a la derecha de la imagen", 
                "Coloca la imagen de la región y ajuste el texto en las partes superior, izquierda e inferior"],
                correct: 0
            },
            {
                 question: `30. Necesita aplicar correctamente una regla de estilo para dispositivos de pantalla con ancho de 480 pixeles o menos. Complete la primera línea del código seleccionando la opción correcta en cada lista desplegable:`,
            codeQuestion: {
        template: `[1] [2] [3] ([4]-[5]: [6]px) {`,
        options: [
            {
                placeholder: "[1]",
                choices: ['@media', '@screen', '@responsive', '@device'],
                correct: 0,
                explanation: "La regla comienza con @media para definir consultas de medios"
            },
            {
                placeholder: "[2]",
                choices: ['screen', 'only screen', 'all', 'device'],
                correct: 1,
                explanation: "'only screen' es la práctica recomendada para dirigirse a dispositivos de pantalla"
            },
            {
                placeholder: "[3]",
                choices: ['or', 'and', 'not', 'with'],
                correct: 1,
                explanation: "'and' conecta el tipo de medio con las condiciones"
            },
            {
                placeholder: "[4]",
                choices: ['width', 'min-width', 'max-width', 'device-width'],
                correct: 2,
                explanation: "max-width define el ancho máximo donde aplicarán los estilos"
            },
            {
                placeholder: "[5]",
                choices: ['', 'device-', 'view-', 'screen-'],
                correct: 0,
                explanation: "No se necesita prefijo para la propiedad básica de ancho"
            },
            {
                placeholder: "[6]",
                choices: ['480', '768', '320', '1024'],
                correct: 0,
                explanation: "480px es el breakpoint solicitado para dispositivos móviles pequeños"
            }
        ]
    },
    type: "code-selection"
            }
        ],
        // Sección 7 (índice 6)
        [
            {
                question: "31. ¿Qué dos eventos de admiten en dispositivos táctiles?",
                options: ["selection", "click", "drag", "mouseover"],
                correct: 1
            },
            {
                question: "32.durante las pruebas se detecta que algunos toques activan varias áreas de entrada ¿quesituación causara este problema?",
                options: ["las áreas de entrada definidas sin demasiado pequeñas",
                    "la pantalla táctil no esta calibrada", 
                    "las áreas de entrada están demasiado cerca", 
                    "las áreas de entrada son semitransparentes"],
                correct: 2
            },
            {
                question: "33.¿Qué 3 eventos son validos para el elemento HTML canvas?",
                options: ["datareceibed,hover,scroll", "mouseup,scroll,blur", "blur,scroll,hover", "blur,datareceibed,hover"],
                correct: 1
            },
            {
                question: "34.¿que propiedad css define los lados de un elemento en los que no se permiteotro elemento flotante?",
                options: ["position", "clear", "float", "display"],
                correct: 1
            },
            {
                question: "35.¿que elemento debe usar para girar un cuadrado svg?",
                options: ["path", "animatioMotion", "circle", "animateTransform"],
                correct: 3
            }
        ],
        // Sección 8 (índice 7)
        [
            {
                question: "36.¿que tres componentes definen la dirección URL usada para los datos de localStorage",
                options: ["nombre del host,puerto unico", "consulta,credencial de usuario,puerto unico",
                     "esquema,consulta,credencial de usuario", "Opción nombre del host,puerto unico,consulta"],
                correct: 0
            },
            {
                question: " 37. Necesita animar de forma que suba por la pantalla desde una posición de 400 pixeles. ¿Qué segmento de código css debe insertar?",
                options: ["100%{top:400;}", "0%{top:400px;}", "50%{top:200px;}", "0%{top:400px;}"],
                correct: 1
            },
            {
                question: "38. Necesitas usar una caja flexible de una forma que el nuevo contenido que se agregue al contenedor aparezca en el punto más alto ¿ qué valor debe usar para flex-direction?",
                options: ["row", "row-reverse", "column", "column-reverse"],
                correct: 3
            },
            {
                question: "39.Esta dibujando en el elemento canvas que se muestra en la imagen. ¿en qué coordenada x-y está la esquina superior izquierda del cuadrado relleno?",
                image: 'images/pregunta39.jpg',
                options: [
                    "0,0",
                    "0,50",
                    "50,0",
                    "50,50"
                ],
                correct: 3
            },
            {
                question: "40.¿Qué método de JavaScript se una para dibujar un círculo en el elemento canvas?",
                options: ["arc", "ellipse", "circle", "bazierCurveTo"],
                correct: 0
            }
        ],
        // Sección 9 (índice 8)
        [
            {
                question: "41.¿Cuál es el efecto de aplicar la propiedad de CSS float:right a una imagen?",
                options: ["Coloca la imagen de la región y ajuste el texto en las partes superior, izquierda e inferior",
                     "Coloca una imagen a la derecha y ajuste el texto en las partes superior izquierda",
                     "Coloca la imagen a la izquierda de la región y ajusta el texto en la parte superior, derecha e interior",
                    "Coloca la imagen a la izquierda y muestra todo el texto a la derecha de la imagen"],
                correct: 1
            },
            {
                 question: "42. ¿Qué dos afirmaciones describen correctamente las consultas multimedia?",
        type: "multi-correct", // Tipo especial para múltiples correctas
        options: [
            "a) Las consultas multimedia permiten aplicar diferentes reglas CSS en distintas pantallas/puntos de interrupción.",
            "b) Las consultas multimedia mejoran el rendimiento de una página web",
            "c) Las consultas multimedia permiten aplicar diferentes reglas CSS en distintos exploradores",
            "d) Las consultas multimedia admiten un diseño web con buena capacidad de respuesta"
        ],
    correct: [0, 3], // Índices de las opciones correctas (a y d)
    explanation: "Las respuestas correctas son a) y d). Las consultas multimedia (@media) permiten adaptar estilos a diferentes dispositivos/pantallas (a) y son fundamentales para el diseño responsive (d). No mejoran directamente el rendimiento (b) ni se usan para aplicar estilos específicos por navegador (c)."

            },
            {
               question: "43.¿ que dos segmentos de CSS son propiedad de filtro validas?",
        type: "multi-correct", // Tipo especial para múltiples correctas
        options: [
            "filter:drop-shadow(16px 16px 16px red)",
            "filter:opacity(25%)",
            "filter:box-shadow(16px 24px 24px green)",
            "filter:blur(25%)"
        ],
    correct: [0, 3], // Índices de las opciones correctas (a y d)
            },
            {
                question: `44.Ha creado mensajes de error personalizados en un formulario.
Cuando un usuario intente enviar el formulario con datos no válidos, debe ocurrir lo siguiente.
•	Los datos deben permanecer en el formulario
•	Se deben mostrar mensajes de error
¿Qué propiedad o método de Event debe usar?`,
                options: ["preventDefault()", "cancelable", "defaultPrevented()", "abort"],
                correct: 0
            },
            {
                question: "45.Necesita aplicar CSS para incluir el texto dentro del borde del elemento sin crear barras de desplazamiento innecesarias ni perder texto.¿ que valor de atributo debe usar?",
                options: ["Overflow:auto;", "Overflow:scroll;", "Overflow:visible;", "Overflow:hidden;"],
                correct: 3
            }
        ],



        // Sección 10 (índice 9)
        [
            {
                question: "46.¿ que dos funciones admiten transformaciones 2D en CSS3? ",
                options: ["move,zomm()",
                     "scroll,move",
                     "matrix(),skew()",
                    "matrix(),scroll"],
                correct: 2
            },
           {
                question: "47.¿Qué tres métodos se asocian con la API localStorage de HTML5?(elije cual contiene las 3 opciones correctas) ",
                options: ["clear,setItem,removeItem",
                     "write,cookie,clear",
                     "cookie,clear,write",
                    "matrix(),cookie,clear"],
                correct: 0
            },
            {
                question: "48.¿Que etiqueta HTML debe utilizar para cualquier campo que necesite la función de autocomplementar?",
                options: ["select",
                     "fieldlist",
                     "datalist",
                    "input"],
                correct: 2
            },
           {
                question: "49. De las siguiemtes tareas¿Cuáles son las tareas para las que se usa JavaScript? ",
                options: ["Agregar estilo a una página web",
                     "Definir el contenido de forma semántica en una página",
                     "Agregar funcionalidad dinámica a una página web",
                    ],
                correct: 2
            },
            {
                question: "50.¿Que estilo css posiciona un elemento en relación con la ventana del navegador? ",
                options: ["position:static",
                     "position:absolute;",
                     "position:relative;",
                    "position:fixed;"],
                correct: 3
            }
        ],

        
        // Sección 11 (índice 10)
        [
            {
                question: "51.¿Cual de los siguinetes métodos se pueden utilizar para establecer dato en localStorage? ",
                options: ["localStorage.insert(key,value);",
                     "localStorage.addItem(key value);",
                     "localStorage.setitem(key,value);",
                    "localStorage.append(key,value);"],
                correct: 2
            },
           {
                question: "52.¿Cuales de los tres métodos que se utilizan para localStorage y sesionStorage?(elige la opcion de 3 correcta) ",
                options: ["setItem(),refresh();,synch();",
                     "setItem(),getItem();,removeItem();",
                     "setItem();,refresh();,synch();",
                    "retrieveItem();,synch();setItem();"],
                correct: 1
            },
            {
                question: "53.¿Cuales son las dos formas de almacenar datos con HTML5 ",
                options: ["localStorage,AppCache",
                     "localStorage,sessionStorage",
                     "offlineStorage,driveCache",
                    "localStorage,offlineStorage"],
                correct: 1
            },
           {
                question: "54.¿Qué modelo de caja establece la alineación, la dirección, y la orientación del contenido? ",
                options: ["Modelo de caja de herencia",
                     "modelo de caja flexible",
                     "Modelo de caja primaria",
                    "Modelo de caja fija"],
                correct: 1
            },
            {
                question: "55.¿Cuáles son los tres métodos que devuelven un nodo, o nodos, según los argumentos enviados? ",
                options: ["retrieveTagName()",
                     "retrieveElementiD()",
                     "getElementByD()",
                    "retrieveID()"],
                correct: 2
            }
        ],






          // Sección 12 (índice 11)
        [
            {
                question: "56.¿Cual es el lmétodo correcto para definir un elemento de bloque como cuadrícula? ",
                options: ["display:grid;",
                     "grid:true();",
                     "ninguna de las mencionadas",
                    "show:grid;"],
                correct: 0
            },
           {
                question: "57.Si pasa un valor negativo al método rotate()¿cual es el resultado ",
                options: ["Girar el elemento hacia la izquierda",
                     "No funciona",
                     "Gira el elemento a la posición de espejo",
                    "Gira el elemento hacia la derecha"],
                correct: 0
            },
            {
                question: "58.¿Cuales son las dos formas de almacenar datos con HTML5 ",
                options: ["localStorage,AppCache",
                     "localStorage,sessionStorage",
                     "offlineStorage,driveCache",
                    "localStorage,offlineStorage"],
                correct: 1
            },
           {
                question: "59.¿Qué modelo de caja establece la alineación, la dirección, y la orientación del contenido? ",
                options: ["Modelo de caja de herencia",
                     "modelo de caja flexible",
                     "Modelo de caja primaria",
                    "Modelo de caja fija"],
                correct: 1
            },
            {
                question: "60.¿Qué método de array devuelve un nuevo array con los elementos que cumplen una condición?javascript",
                options: ["reduce()",
                     "filter()",
                     "map()",
                    "forEach()"],
                correct: 1
            }
        ],


            // Sección 13 (índice 12)


            [
            {
                question: "61.¿Cuáles son las tres funciones incluidas en el objeto de geolocalización? ",
                options: ["clearWatchPosition,watchPosition,getCurrentPosition",
                     "getLocation,findLocation,watchLocation",
                     "clearWatchPosition,getLocation,getCurrentPosition",
                    "findLocation,getLocation,clearWatchPosition"],
                correct: 0
            },
           {
                question: "62.¿Qué segmento de código establece el fondo de un párrafo en azul (blue) con un borde rojo (red border) ",
                options: ["p{background-color: blue;border-color: 10px ouset red;}",
                     "p {background-color = blue;border = 10px outset red;}",
                     "p {background-color: blue;border: 10px outset red;}",
                    "p {background-color: blue;border-color: 10px red;}"],
                correct: 2
            },
            {
                question:`63 Dada la hoja de estilos interna y el estilo insertado proporcionados, qué afirmación es
                    verdadera?
                    </style>\n
                        </head>
                        <body>
                        <p style= color:red; text- decorat ion :underline;' ">First paragraph</p>
                        </body>
                        </html>`,
                options: ["El texto \"First paragraph\" aparecera en morado y sin subrayar",
                     "El texto \"First paragraph\" aparecerá en morado y subrayado.",
                     "El texto \"First paragraph\" aparecerá en rojo y sin subrayar.",
                    "El texto \"First paragraph\"aparecerá en rojo y subrayado."],
                correct: 1
            },
           {
                question: "64.¿Qué fragmento de código HTML5 muestra una forma de validar si una entradanumérica tiene un valor comprendido entre 1 y 100, ambos inclusive?",
                options: ["<input type=\"positive\" limit=\"100\">",
                     "<input type=\"num\" min=\"1\" max=\"100\">",
                     "<input type=\"number\" min=\"1\" max=\"100\">",
                    "<input type=\"number\" low=\"1\" high=\"100\">"],
                correct: 2
            },
            {
                question: "65.¿Cuál es la sintaxis correcta para cambiar el color de fuente de un vínculo visitado amagenta?",
                options: ["a:link { color: magenta; }",
                     "a:visited { color: magenta; }",
                     "a:link { color = magenta; }",
                    "a:visited { color = magenta; }"],
                correct: 1
            }
        ],


        //seccion 14 (indice 13)
[
    {
        question: "66. ¿Cuál es el valor por defecto de la propiedad position en CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        correct: 3
    },
    {
        question: "67. ¿Qué selector aplica un estilo a todos los elementos del documento?",
        options: [".all", "#todo", "*", "body"],
        correct: 2
    },
    {
        question: "68. ¿Cuál es la sintaxis correcta para cambiar el color de un vínculo visitado a magenta?",
        options: [
            "a:link { color: magenta; }",
            "a:visited { color: magenta; }",
            "a:link { color = magenta; }",
            "a:visited { color = magenta; }"
        ],
        correct: 1
    },
    {
        question: "69. ¿Qué valor de la propiedad position mantiene un elemento fijo en la pantalla?",
        options: ["absolute", "relative", "fixed", "static"],
        correct: 2
    },
    {
        question: "70. ¿Cuál código aplica un borde rojo y fondo azul correctamente?",
        options: [
            "border-color = red; background-color = blue;",
            "border: 10px red; background = blue;",
            "border: 10px outset red; background-color: blue;",
            "background-color: blue; border = red;"
        ],
        correct: 2
    }
],
            //seccion 15 (indice 14)



        [
    {
        question: "71. ¿Qué etiqueta HTML es semántica y se usa para navegación?",
        options: ["<nav>", "<section>", "<aside>", "<div>"],
        correct: 0
    },
    {
        question: "72. ¿Qué código mostrará controles de reproducción y pausa en un archivo de audio?",
        options: [
            "<audio autoplay>",
            "<audio preload=\"controls\">",
            "<audio preload=\"auto\">",
            "<audio controls>"
        ],
        correct: 3
    },
    {
        question: "73. ¿Qué etiqueta se usa para proporcionar una descripción a una imagen en HTML5?",
        options: ["<figcaption>", "<caption>", "<legend>", "<summary>"],
        correct: 0
    },
    {
        question: "74. ¿Qué selector se usa para aplicar estilos a todos los elementos con clase \"main\"?",
        options: ["#main", "a[name=\"main\"]", ".main", "a#main"],
        correct: 2
    },
    {
        question: "75. ¿Cuál es el orden correcto en el ciclo de vida de una aplicación?",
        options: [
            "Escribir código → Implementar → Validar",
            "Validar → Empaquetar → Escribir código",
            "Escribir código → Validar → Empaquetar → Implementar",
            "Depurar → Implementar → Validar"
        ],
        correct: 2
    }
],
    //seccion 16
    [
    {
        question: "76. ¿Qué propiedad de CSS se usa para establecer el espacio entre líneas?",
        options: ["line-height", "letter-spacing", "gap", "spacing"],
        correct: 0
    },
    {
        question: "77. ¿Qué elemento permite cargar estilos externos en una página HTML?",
        options: ["<style>", "<meta>", "<link>", "<script>"],
        correct: 2
    },
    {
        question: "78. ¿Qué atributo meta permite definir la escala de una página en dispositivos móviles?",
        options: [
            "name=\"description\"",
            "name=\"content\"",
            "name=\"viewport\"",
            "name=\"keywords\""
        ],
        correct: 2
    },
    {
        question: "79. ¿Qué valor de display centra un bloque horizontalmente con margin: 0 auto?",
        options: ["inline-block", "block", "inline", "flex"],
        correct: 1
    },
    {
        question: "80. ¿Qué atributo permite mostrar texto alternativo mientras se carga una imagen?",
        options: ["alt", "title", "value", "label"],
        correct: 0
    }
],
        
//seccion 17
        [
    {
        question: "81. ¿Cuál de los siguientes es un selector de clase válido en CSS?",
        options: ["#main", "h1", ".container", "*main"],
        correct: 2
    },
    {
        question: "82. ¿Qué propiedad se usa para establecer la fuente en CSS?",
        options: [
            "text-family",
            "font-type",
            "font-family",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "83. ¿Qué elemento se utiliza para definir el encabezado de un documento HTML?",
        options: ["<head>", "<title>", "<header>", "<meta>"],
        correct: 0
    },
    {
        question: "84. ¿Qué propiedad se usa para redondear esquinas de un contenedor?",
        options: ["border", "radius", "round-corner", "border-radius"],
        correct: 3
    },
    {
        question: "85. ¿Qué etiqueta se usa para agrupar campos en un formulario?",
        options: ["<input>", "<form>", "<fieldset>", "<group>"],
        correct: 2
    }
],
//seccion 18

        [
    {
        question: "86. ¿Cuál de estas es mejor funcionalmente para centrar un elemento?",
        options: [
            "margin: 0 auto;",
            "float: none; display: block; text-align: center;",
            "display: block; margin-left: auto; margin-right: auto;",
            "text-align: center;"
        ],
        correct: 2
    },
    {
        question: "87. ¿Qué texto aparece mientras se carga la imagen en este código? <pre>&lt;img src=\"flowers.png\" alt=\"Flowers\" title=\"Carnations\"&gt;</pre>",
        options: ["Flowers", "Carnations", "flowers.png", "image"],
        correct: 0
    },
    {
        question: "88. ¿Qué etiqueta se usa para definir comentarios en HTML?",
        options: [
            "&lt;!-- Comentario --&gt;",
            "// Comentario",
            "# Comentario",
            "&lt;comment&gt;"
        ],
        correct: 0
    },
    {
        question: "89. ¿Qué etiqueta se usa para mostrar el título de la pestaña del navegador?",
        options: ["<title>", "<meta>", "<head>", "<h1>"],
        correct: 0
    },
    {
        question: "90. ¿Qué elemento HTML agrupa navegación principal?",
        options: ["<nav>", "<menu>", "<aside>", "<section>"],
        correct: 0
    }
],

//seccion 19


        [
    {
        question: "91. ¿Cuál es la forma correcta de anidar etiquetas HTML?",
        options: [
            "&lt;p&gt;&lt;strong&gt;&lt;em&gt;texto&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;",
            "&lt;p&gt;&lt;strong&gt;texto&lt;/strong&gt;&lt;/p&gt;&lt;em&gt;",
            "&lt;p&gt;This is HTML5 &lt;strong&gt;&lt;em&gt;text formatting&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;",
            "&lt;strong&gt;&lt;p&gt;&lt;em&gt;text&lt;/em&gt;&lt;/p&gt;&lt;/strong&gt;"
        ],
        correct: 2
    },
    {
        question: "92. ¿Qué propiedad CSS se usa para definir el tamaño entre caracteres?",
        options: [
            "character-spacing",
            "text-gap",
            "letter-spacing",
            "spacing"
        ],
        correct: 2
    },
    {
        question: "93. ¿Qué propiedad meta permite mostrar resultados en buscadores?",
        options: ["viewport", "description", "title", "content"],
        correct: 3
    },
    {
        question: "94. ¿Qué elemento se usa para indicar que algo es importante?",
        options: ["<div>", "<p>", "<strong>", "<em>"],
        correct: 2
    },
    {
        question: "95. ¿Qué propiedad se utiliza para establecer la opacidad del texto en CSS?",
        options: ["transparency", "alpha", "visible", "opacity"],
        correct: 3
    }
],
        //seccion 20

        [
    {
        question: "96. ¿Qué estilo se aplica si no hay ningún estilo personalizado definido?",
        options: [
            "Estilo insertado",
            "Estilo interno",
            "Estilo externo",
            "Estilo predeterminado del explorador"
        ],
        correct: 3
    },
    {
        question: "97. ¿Qué etiqueta se usa para mostrar una lista ordenada?",
        options: ["<ul>", "<list>", "<ol>", "<menu>"],
        correct: 2
    },
    {
        question: "98. ¿Qué elemento semántico se usa para navegación principal?",
        options: ["<nav>", "<aside>", "<header>", "<footer>"],
        correct: 0
    },
    {
        question: "99. ¿Qué situación causará que una pantalla táctil active varias áreas al mismo tiempo?",
        options: [
            "No está calibrada",
            "Áreas de entrada muy pequeñas",
            "Son semitransparentes",
            "Están demasiado cerca"
        ],
        correct: 3
    },
    {
        question: "100. ¿Qué propiedad de CSS define un contenedor como una cuadrícula?",
        options: [
            "display: grid;",
            "display: block;",
            "display: container;",
            "display: inline-block;"
        ],
        correct: 0
    }
],

            //seccion 21

            [
    {
        question: "101. ¿Cuál es el problema en este código HTML? <code>&lt;body&gt; &lt;html&gt;</code>",
        options: [
            "&lt;nav&gt; no puede contener &lt;ul&gt;",
            "&lt;nav&gt; debe estar en &lt;head&gt;",
            "&lt;nav&gt; está mal posicionado",
            "&lt;body&gt; está antes de &lt;html&gt;"
        ],
        correct: 3
    },
    {
        question: "102. ¿Qué fragmento HTML valida una entrada entre 1 y 100?",
        options: [
            "&lt;input type=\"num\" min=\"1\" max=\"100\"&gt;",
            "&lt;input type=\"positive\" limit=\"100\"&gt;",
            "&lt;input type=\"number\" min=\"1\" max=\"100\"&gt;",
            "&lt;input type=\"number\" low=\"1\" high=\"100\"&gt;"
        ],
        correct: 2
    },
    {
        question: "103. ¿Cuál es el orden correcto del ciclo de vida de una aplicación?",
        options: [
            "Depurar → Validar → Empaquetar → Implementar",
            "Validar → Empaquetar → Escribir código",
            "Escribir código → Validar → Empaquetar → Implementar",
            "Empaquetar → Escribir código → Implementar"
        ],
        correct: 2
    },
    {
        question: "104. ¿Qué propiedad de posición coloca un elemento con respecto al antecesor más cercano?",
        options: ["static", "fixed", "absolute", "relative"],
        correct: 2
    },
    {
        question: "105. ¿Qué atributo HTML muestra controles de audio como Play y Pause?",
        options: [
            "autoplay",
            "preload=\"controls\"",
            "preload=\"auto\"",
            "controls"
        ],
        correct: 3
    }
]



    //seccion 22
    [
    {
        question: "106. Debido a un error de sintaxis, hay un estilo que no se ha aplicado al documento. ¿Cuál es el código con error?",
        options: [
            "font family:\"Lucida Sans\"",
            "font-size:12pt;",
            "background: linen;",
            "text-align: center;"
        ],
        correct: 0
    },
    {
        question: "107. Tiene que crear un selector que se aplique a tres vínculos con clase \"main\". ¿Qué selector debe usar?",
        options: [
            "a#main",
            "#main",
            "[name=\"main\"]",
            ".main"
        ],
        correct: 3
    },
    {
        question: "108. Tiene que aplicar formato al párrafo \"Come join the fun!\". ¿Cuál propiedad de CSS se usa para alinear el texto?",
        options: [
            "font-style",
            "text-align",
            "text-decoration",
            "font-weight"
        ],
        correct: 1
    },
    {
        question: "109. Tiene que agregar elementos meta para mejorar la visibilidad en buscadores. ¿Cuál es la meta correcta para las palabras clave?",
        options: [
            "meta charset",
            "meta name=\"viewport\"",
            "meta name=\"keywords\"",
            "meta name=\"description\""
        ],
        correct: 2
    },
    {
        question: "110. ¿Qué código CSS centra un título y muestra una línea ondulada azul debajo?",
        options: [
            "text-align: center; text-decoration: underline blue wavy;",
            "text-decoration-line: underline blue wavy;",
            "text-shadow: 2px 2px underline blue wavy;",
            "font-style: underline blue wavy;"
        ],
        correct: 0
    }
],
//seccion 23
        [
    {
        question: "111. ¿Qué valor de la propiedad position mantiene un elemento fijo al hacer scroll?",
        options: [
            "position: absolute;",
            "position: relative;",
            "position: fixed;",
            "position: static;"
        ],
        correct: 2
    },
    {
        question: "112. ¿Cuál es el marcado correcto para enlazar con la sección 2 desde la parte superior del documento?",
        options: [
            "&lt;a href=\"#Section2\"&gt;Section 2&lt;/a&gt;",
            "&lt;a name=\"Section2\"&gt;Section 2&lt;/a&gt;",
            "&lt;a id=\"Section2\"&gt;Section 2&lt;/a&gt;",
            "&lt;section href=\"#Section2\"&gt;Section 2&lt;/section&gt;"
        ],
        correct: 0
    },
    {
        question: "113. ¿Cuál es la etiqueta correcta para filas en una tabla HTML?",
        options: ["&lt;h1&gt;", "&lt;tr&gt;", "&lt;td&gt;", "&lt;th&gt;"],
        correct: 1
    },
    {
        question: "114. ¿Qué propiedad CSS centra texto y muestra línea ondulada azul?",
        options: [
            "text-align: center; text-decoration: underline blue wavy;",
            "text-decoration-line: underline blue wavy;",
            "text-shadow: 2px 2px underline blue wavy;",
            "font-style: underline blue wavy;"
        ],
        correct: 0
    },
    {
        question: "115. ¿Qué dos fragmentos de código HTML5 reproducen un vídeo automáticamente al cargarse la página?",
        type: "multi-correct",
        options: [
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" autoplay&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" controls autoplay&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" controls&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" preload=\"auto\"&gt;"
        ],
        correct: [0, 1] // Índices de las opciones correctas (A y B)
    }
],

//seccion 24
[
    {
        question: "116. Quiere aplicar un estilo a todos los elementos del documento. ¿Qué selector de tipos debe usar?",
        options: ["*", ":", "+", ">"],
        correct: 0
    },
    {
        question: "117. Tienes que crear una hoja de estilo con una línea roja continua de 4px. ¿Qué propiedad aplicarías?",
        type: "code-selection",
        template: "[1] [2] [3] [4]",
        options: [
            {
                placeholder: "[1]",
                choices: ["div", "border", "4px solid red", "margin"],
                correct: 1
            },
            {
                placeholder: "[2]",
                choices: [":", ";", "=", " "],
                correct: 0
            },
            {
                placeholder: "[3]",
                choices: ["4px", "solid", "red", "4px solid red"],
                correct: 3
            },
            {
                placeholder: "[4]",
                choices: [";", ":", "=", " "],
                correct: 0
            }
        ],
        explanation: "La solución correcta es: border: 4px solid red;"
    },
    {
        question: "118. Quiere aplicar un estilo a todos los elementos del documento. ¿Qué selector de tipos debe usar?",
        options: ["*", ":", "+", ">"],
        correct: 0
    },
    {
        question: "119. ¿Qué dos fragmentos de código HTML5 reproducen un vídeo automáticamente al cargarse la página?",
        type: "multi-correct",
        options: [
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" autoplay&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" controls autoplay&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" controls&gt;",
            "&lt;video src=\"myVideo.ogg\" width=\"320\" height=\"320\" preload=\"auto\"&gt;"
        ],
        correct: [0, 1]
    },
    {
        question: "120. Durante las pruebas detecta que algunos toques activan varias áreas de entrada. ¿Qué situación causará este problema?",
        options: [
            "Las áreas de entrada definidas son demasiado pequeñas.",
            "La pantalla táctil no está calibrada.",
            "Las áreas de entrada están demasiado cerca.",
            "Las áreas de entrada son semitransparentes."
        ],
        correct: 2
    }
],

//seccion 25
            [
    {
        question: "121. ¿Qué dos afirmaciones describen correctamente las consultas multimedia?",
        type: "multi-correct",
        options: [
            "Las consultas multimedia mejoran el rendimiento de una página web",
            "Las consultas multimedia admiten un diseño web con buena capacidad de respuesta",
            "Las consultas multimedia permiten aplicar diferentes reglas de CSS en distintas pantallas/puntos de interrupción",
            "Las consultas multimedia permiten aplicar diferentes reglas de CSS en distintos exploradores."
        ],
        correct: [1, 2]
    },
    {
        question: "122. ¿Qué dibuja el siguiente marcado HTML? ctx.arc(x, y, r, 0, Math.PI, true);",
        options: [
            "Una línea de un punto a otro",
            "Un cuadrado en el punto dado",
            "Un círculo en el punto dado",
            "Un semicírculo en el punto dado"
        ],
        correct: 3
    },
    {
        question: "123. ¿Qué dos funciones admiten transformaciones 2D en CSS3?",
        type: "multi-correct",
        options: ["skew()", "matrix()", "scroll()", "zoom()", "move()"],
        correct: [0, 1]
    },
    {
        question: "124. Tienes que crear una hoja de estilo con una línea roja continua de 4px. ¿Qué propiedad aplicarías?",
        type: "code-selection",
        template: "[1]: [2];",
        options: [
            {
                placeholder: "[1]",
                choices: ["border", "outline", "margin", "padding"],
                correct: 0
            },
            {
                placeholder: "[2]",
                choices: ["4px solid red", "red 4px solid", "solid red 4px", "4px red solid"],
                correct: 0
            }
        ],
        explanation: "La solución correcta es: border: 4px solid red;"
    },
    {
        question: "125. ¿Cuál es el marcado correcto para un número de teléfono de 10 dígitos sin símbolos?",
        type: "code-selection",
        template: "&lt;input [1]=\"tel\" [2]=\"[0-9]{10}\" [3]=\"0000000000\" [4]&gt;",
        options: [
            {
                placeholder: "[1]",
                choices: ["id", "name", "class", "type"],
                correct: 3
            },
            {
                placeholder: "[2]",
                choices: ["pattern", "regex", "validate", "format"],
                correct: 0
            },
            {
                placeholder: "[3]",
                choices: ["placeholder", "value", "default", "init"],
                correct: 0
            },
            {
                placeholder: "[4]",
                choices: ["autocomplete=\"off\"", "required", "novalidate", "type=\"tel\""],
                correct: 0
            }
        ]
    }
],



//seccion 27

            [
    {
        question: "126. Ingrese un código que cumpla el patrón: AAAA-00-0000-AAAA",
        type: "code-selection",
        template: "&lt;input [1]=\"code\" [2]=\"[a-zA-Z]{4}-[0-9]{2}-[0-9]{4}-[a-zA-Z]{4}\" [3]=\"Ej: Kgyn-23-3978-Uhj6\"&gt;",
        options: [
            {
                placeholder: "[1]",
                choices: ["id", "name", "class", "type"],
                correct: 1
            },
            {
                placeholder: "[2]",
                choices: ["pattern", "regex", "validate", "format"],
                correct: 0
            },
            {
                placeholder: "[3]",
                choices: ["placeholder", "value", "default", "init"],
                correct: 0
            }
        ],
        explanation: "Ejemplo válido: kukX-34-4938-WJDF"
    },
    {
        question: "127. Relacione cada etapa de Administración del ciclo de vida de las aplicaciones con la tarea.",
        type: "matching",
        matchingQuestion: {
            description: "Relacione cada etapa con su tarea correspondiente:",
            items: [
                {
                    id: 1,
                    left: "Planear",
                    rightOptions: [
                        "Identificar la finalidad y la audiencia del sitio web",
                        "Crear el sitio web",
                        "Publicar el sitio web"
                    ],
                    correctRight: "Identificar la finalidad y la audiencia del sitio web"
                },
                {
                    id: 2,
                    left: "Desarrollar",
                    rightOptions: [
                        "Identificar la finalidad y la audiencia del sitio web",
                        "Crear el sitio web",
                        "Publicar el sitio web"
                    ],
                    correctRight: "Crear el sitio web"
                },
                {
                    id: 3,
                    left: "Implementar",
                    rightOptions: [
                        "Identificar la finalidad y la audiencia del sitio web",
                        "Crear el sitio web",
                        "Publicar el sitio web"
                    ],
                    correctRight: "Publicar el sitio web"
                }
            ],
            correctOrder: [1, 2, 3]
        }
    },
    {
        question: "128. Relaciona cada atributo con su descripción.",
        type: "matching",
        matchingQuestion: {
            description: "Relacione cada atributo HTML con su descripción correcta:",
            items: [
                {
                    id: 1,
                    left: "pattern",
                    rightOptions: [
                        "Establece una expresión regular con la que debe coincidir el valor.",
                        "Establece el texto predeterminado hasta que se coloque el foco.",
                        "Establece elementos como obligatorios.",
                        "Permite más de un archivo o dirección en una entrada."
                    ],
                    correctRight: "Establece una expresión regular con la que debe coincidir el valor."
                },
                {
                    id: 2,
                    left: "placeholder",
                    rightOptions: [
                        "Establece una expresión regular con la que debe coincidir el valor.",
                        "Establece el texto predeterminado hasta que se coloque el foco.",
                        "Establece elementos como obligatorios.",
                        "Permite más de un archivo o dirección en una entrada."
                    ],
                    correctRight: "Establece el texto predeterminado hasta que se coloque el foco."
                },
                {
                    id: 3,
                    left: "required",
                    rightOptions: [
                        "Establece una expresión regular con la que debe coincidir el valor.",
                        "Establece el texto predeterminado hasta que se coloque el foco.",
                        "Establece elementos como obligatorios.",
                        "Permite más de un archivo o dirección en una entrada."
                    ],
                    correctRight: "Establece elementos como obligatorios."
                },
                {
                    id: 4,
                    left: "multiple",
                    rightOptions: [
                        "Establece una expresión regular con la que debe coincidir el valor.",
                        "Establece el texto predeterminado hasta que se coloque el foco.",
                        "Establece elementos como obligatorios.",
                        "Permite más de un archivo o dirección en una entrada."
                    ],
                    correctRight: "Permite más de un archivo o dirección en una entrada."
                }
            ],
            correctOrder: [1, 4, 3, 2]
        }
    },
    {
        question: "129. ¿Qué tres métodos se asocian con la API localStorage de HTML5?",
        type: "multi-correct",
        options: [
            "clear",
            "cookie",
            "setItem",
            "write",
            "removeItem"
        ],
        correct: [0, 2, 4] // clear, setItem, removeItem
    },
    {
        question: "130. ¿Qué dos segmentos de CSS son propiedades de filtro válidas?",
        type: "multi-correct",
        options: [
            "filter: opacity(25%)",
            "filter: drop-shadow(16px 16px 16px red)",
            "filter: box-shadow (16px 24px 24px green)",
            "filter: blur(25%)"
        ],
        correct: [0, 1] // opacity y drop-shadow
    }
],

//seccion 28

            [
    {
        question: "131. ¿Qué entrada se validará correctamente según el patrón requerido AAAA-00-0000-AAAA?",
        options: [
            "kukX-34-4938-WJDF",
            "AGbe-23h-234-HBG6",
            "y7Ts-A3-4876-ASFr",
            "Kgyn-23-3978-Uhj6"
        ],
        correct: 0
    },
    {
        question: "132. Está creando la siguiente página web: <pre>&lt;body&gt;\n  &lt;h1 style=\"font-size: 30px;\"&gt;The Jazz Club&lt;/h1&gt;\n  &lt;p&gt;Come join the fun!&lt;/p&gt;\n&lt;/body&gt;</pre>\nDebe crear el estilo CSS necesario para dar formato al párrafo. ¿Qué combinación es correcta?",
        options: [
            "text-indent: underline; font-weight: 59px",
            "font-style: bold; font-size: italic",
            "text-align: left; font-style: italic; text-decoration: underline; font-size: 59px; text-decoration-color: purple; font-weight: bold",
            "text-align: center; font-size: 59px; font-style: bold"
        ],
        correct: 2
    },
    {
        question: "133. ¿Qué segmentos de marcado deben usarse y en qué orden? Está diseñando una página para Winter Sports Corporation con HTML. Selecciona los 4 segmentos en el orden correcto.",
        options: [
            "&lt;head&gt;, &lt;meta&gt;, &lt;header&gt;, &lt;title&gt;",
            "&lt;header&gt;, &lt;meta&gt;, &lt;title&gt;, &lt;head&gt;",
            "&lt;head&gt;, &lt;meta charset=\"utf-8\"&gt;, &lt;title&gt;About Winter Sports Corporation&lt;/title&gt;, &lt;/head&gt;",
            "&lt;header&gt;, &lt;meta charset=\"utf-8\"&gt;, &lt;title&gt;, &lt;/head&gt;"
        ],
        correct: 2
    },
    {
        question: "134. Necesita mostrar una imagen diferente según el tamaño de pantalla.",
        options: [
            "&lt;img src=\"family.png\" media=\"(min-width:800px)\"&gt;",
            "&lt;image src=\"family.png\" alt=\"portrait\"&gt;",
            "&lt;img&gt;&lt;source src=\"family.png\"&gt;&lt;/img&gt;",
            "&lt;picture&gt;&lt;source media=\"(min-width:800px)\" srcset=\"family.png\"&gt;&lt;img src=\"family.gif\" alt=\"Family portrait\" style=\"width:auto\"&gt;&lt;/picture&gt;"
        ],
        correct: 3
    },
    {
        question: "135. Analiza el siguiente código: <pre>&lt;body&gt;\n  &lt;h1 style=\"color:navy\"&gt;Learning CSS&lt;/h1&gt;\n  &lt;ul&gt;\n    &lt;li style=\"color:blue\"&gt;Inline Styles&lt;/li&gt;\n    &lt;li style=\"color:blue\"&gt;Internal Styles&lt;/li&gt;\n    &lt;li style=\"color:blue\"&gt;External Styles&lt;/li&gt;\n  &lt;/ul&gt;\n&lt;/body&gt;</pre>\n¿Qué afirmación es verdadera?",
        options: [
            "El estilo de color de los elementos &lt;li&gt; debe transferirse al &lt;body&gt;",
            "El estilo del &lt;h1&gt; debe moverse a una hoja de estilos interna",
            "El estilo de los elementos &lt;li&gt; debe moverse a una hoja de estilos externa",
            "El código se ajusta a las prácticas recomendadas"
        ],
        correct: 2
    }
],
// Sección 20 (índice 19)
[
    {
        question: "136. Está creando un sitio para una florería. Debe mostrar la imagen carnation.png y al hacer clic abrir la página carnations.html. ¿Cuál es el marcado correcto?",
        options: [
            "&lt;a src=\"carnation.png\"&gt;&lt;img href=\"carnations.html\"/&gt;&lt;/a&gt;",
            "&lt;a href=\"carnations.html\"&gt;&lt;img src=\"carnation.png\"&gt;&lt;/a&gt;",
            "&lt;img src=\"carnation.png\" link=\"carnations.html\"&gt;",
            "&lt;img href=\"carnation.png\"&gt;&lt;a src=\"carnations.html\"&gt;&lt;/a&gt;"
        ],
        correct: 1
    },
    {
        question: "137. El validador HTML ha marcado el siguiente segmento de código como no válido: <pre>&lt;header&gt;\n  &lt;h1&gt;Top Songs&lt;/h1&gt;\n  &lt;p&gt;Please make a selection...&lt;/p&gt;\n  &lt;nav&gt;\n    &lt;a href=\"#Pop\"&gt;Pop&lt;/a&gt;\n    &lt;a href=\"#Jazz\"&gt;Jazz&lt;/a&gt;\n    &lt;a href=\"#Class\"&gt;Classical&lt;/a&gt;\n  &lt;/nav&gt;\n&lt;/header&gt;</pre>\n¿Cuál es el problema del código?",
        options: [
            "La etiqueta &lt;/nav&gt; debería estar encima de la etiqueta &lt;/header&gt;",
            "La etiqueta &lt;nav&gt; no puede estar dentro de la etiqueta &lt;header&gt;",
            "La etiqueta &lt;p&gt; no puede estar dentro de la etiqueta &lt;header&gt;",
            "La etiqueta &lt;header&gt; solo puede tener un elemento secundario"
        ],
        correct: 1
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
        
        localStorage.setItem('quizResults', JSON.stringify(results));
        console.log('Resultados guardados:', results);
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