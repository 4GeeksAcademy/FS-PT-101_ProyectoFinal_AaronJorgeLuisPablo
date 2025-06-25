from app import app
from api.models import db, Users, Professionals, Activities, Info_activity, Reviews, Reports, Media, Favourites, Inscriptions, Administrators, Clients
from api.models import enumProf, enumClts, enumInfo
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

with app.app_context():
    db.drop_all()
    db.create_all()

    # Usuarios
    users = [
        Users( email="ana@example.com", password=generate_password_hash("1234")),
        Users(email="luis@example.com", password=generate_password_hash("1234")),
        Users(email="maria@example.com", password=generate_password_hash("1234")),
        Users(email="juan@example.com", password=generate_password_hash("1234")),
        Users(email="laura@example.com", password=generate_password_hash("1234")),
        Users(email="carlos@example.com", password=generate_password_hash("1234")),
        Users(email="lucia@example.com", password=generate_password_hash("1234")),
        Users(email="david@example.com", password=generate_password_hash("1234")),
        Users(email="elena@example.com", password=generate_password_hash("1234")),
        Users(email="jorge@example.com", password=generate_password_hash("1234")),
    ]
    db.session.add_all(users)
    db.session.commit()

    clients = [
        Clients(user_id=users[0].id, username="anauser",name="Ana",surname="López", telephone="600111221", NID="12345678A", avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Calle Sol 1",city="Madrid",birthdate=datetime(1990, 5, 20),gender=enumClts.female, country="España"),
        Clients(user_id=users[1].id, username="luisuser",name="Luis",surname="Pérez", telephone="600111222", NID="12345678B", avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Calle Luna 2",city="Barcelona",birthdate=datetime(1988, 7, 15),gender=enumClts.male, country="España"),
        Clients(user_id=users[2].id, username="mariauser",name="María",surname="García", telephone="600111223",NID="12345678C",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Avenida del Mar 3",city="Valencia",birthdate=datetime(1992, 3, 10),gender=enumClts.female, country="España"),
        Clients(user_id=users[3].id, username="juanuser",name="Juan",surname="Martínez", telephone="600111224",NID="12345678D",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Calle Río 4",city="Sevilla",birthdate=datetime(1985, 12, 1),gender=enumClts.male, country="España"),
        Clients(user_id=users[4].id, username="laurauser",name="Laura",surname="Sánchez", telephone="600111225",NID="12345678E",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Plaza Mayor 5",city="Bilbao",birthdate=datetime(1995, 8, 30),gender=enumClts.female, country="España"),
        Clients(user_id=users[5].id, username="carlosuser",name="Carlos",surname="Fernández", telephone="600111226",NID="12345678F",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Calle Olivo 6",city="Granada",birthdate=datetime(1991, 2, 18),gender=enumClts.male, country="España"),
        Clients(user_id=users[6].id, username="luciauser",name="Lucía",surname="Ruiz", telephone="600111227",NID="12345678G",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Avenida Paz 7",city="Zaragoza",birthdate=datetime(1993, 11, 5),gender=enumClts.female, country="España"),
        Clients(user_id=users[7].id, username="daviduser",name="David",surname="Jiménez", telephone="600111228",NID="12345678H",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Calle Jardín 8",city="Málaga",birthdate=datetime(1989, 6, 22),gender=enumClts.male, country="España"),
        Clients(user_id=users[8].id, username="elenauser",name="Elena",surname="Moreno", telephone="600111229",NID="12345678I",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg"
            ,address="Calle Lago 9",city="Alicante",birthdate=datetime(1994, 9, 14),gender=enumClts.female, country="España"),
        Clients(user_id=users[9].id, username="jorgeuser",name="Jorge",surname="Muñoz", telephone="600111230",NID="12345678J",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Avenida Sierra 10",city="Santander",birthdate=datetime(1987, 4, 27),gender=enumClts.male, country="España"),
    ]

    db.session.add_all(clients)
    db.session.commit()

     # Professionales
    profs = [Professionals(user_id=users[0].id,
        bio="Soy monitora de actividades de aventura y una gran apasionada de todo lo que tenga que ver con la naturaleza, el deporte y la emoción de vivir nuevas experiencias al aire libre. Desde muy pequeña he sentido una conexión especial con la montaña, los ríos, los senderos y cada rincón donde se respira libertad. Por eso me dedico con todo mi corazón a compartir esa pasión con otras personas. Mi objetivo es que cada actividad sea algo más que una simple excursión: quiero que vivas una auténtica experiencia que te conecte contigo mismo, con los demás y con el entorno natural que nos rodea. Ya sea escalando una pared, cruzando un puente colgante, descendiendo un barranco o simplemente caminando por un bosque al atardecer, siempre me esfuerzo por crear un ambiente seguro, divertido y lleno de energía positiva. A lo largo de nuestra aventura, aprenderás nuevas habilidades, superarás retos personales y descubrirás paisajes que te dejarán sin aliento. Pero, sobre todo, compartirás risas, historias y momentos únicos que quedarán grabados en tu memoria. Porque no se trata solo de hacer deporte o de vivir una experiencia intensa: se trata de coleccionar recuerdos inolvidables y de disfrutar del presente como nunca antes. Estoy aquí para guiarte, motivarte y acompañarte en cada paso. Así que, si te animas a vivir algo diferente, auténtico y emocionante, ¡prepárate! Juntos pasaremos momentos increíbles que recordarás toda la vida.",
        type=enumProf.freelance,business_name="AnaSportive",
        tax_address="Calle Mayor 1",nuss="NUSS123456"
    ), Professionals(user_id=users[1].id,
        bio="Somos una empresa especializada en la organización de eventos sociales, con sede en Madrid y una firme vocación por llevar experiencias inolvidables a cualquier rincón del territorio. Nos apasiona crear momentos únicos que conecten a las personas, ya sea a través de celebraciones íntimas, encuentros corporativos o actividades lúdicas diseñadas para disfrutar, compartir y celebrar la vida. Madrid es nuestro punto de partida y el corazón de muchas de nuestras propuestas, pero no conocemos límites geográficos cuando se trata de hacer realidad una buena idea. Nos desplazamos allá donde nos necesites, adaptándonos al entorno, al público y al tipo de evento que desees realizar. Nuestra visión es clara: convertir cualquier espacio en un escenario perfecto para crear recuerdos imborrables. Cada evento que organizamos nace del cuidado por los detalles y de una planificación pensada para que todo fluya con naturalidad, elegancia y diversión. Escuchamos a nuestros clientes, nos involucramos con sus ideas y aportamos creatividad, professionalidad y entusiasmo en cada paso del proceso. No importa si se trata de una fiesta privada, una jornada para fomentar el trabajo en equipo, una experiencia cultural o una actividad recreativa al aire libre: nos encanta asumir nuevos retos y darles vida. Gracias a nuestro equipo dinámico, con experiencia en logística, animación, coordinación y diseño de experiencias, conseguimos que cada ocasión sea especial, adaptándonos a diferentes públicos, edades y estilos. Nuestro compromiso es ofrecer eventos que no solo cumplan expectativas, sino que las superen. Porque creemos que los mejores recuerdos se crean cuando la organización es impecable y el ambiente invita a disfrutar, estamos aquí para ayudarte a imaginar, planificar y celebrar. Desde Madrid hacia donde tú quieras, diseñamos vivencias que se sienten y se recuerdan.",
        type=enumProf.business,business_name="TuOcioCentral",
        tax_address="Calle Ocio 2",nuss="NUSS654321"
    ), Professionals(user_id=users[2].id,
        bio="Soy guía turístico professional, con una profunda vocación por compartir la historia, la cultura y los rincones más fascinantes de cada lugar con viajeros de todo el mundo. Mi trabajo no es solo mostrar monumentos o dar datos: es crear experiencias memorables que conecten emocionalmente a las personas con el destino que están explorando. A lo largo de los años he tenido el privilegio de acompañar a todo tipo de grupos —familias, aventureros, parejas, estudiantes, empresas y viajeros solitarios— por paisajes urbanos y naturales, descubriendo juntos el alma auténtica de cada lugar. Mi formación y experiencia me permiten ofrecer rutas adaptadas a diferentes intereses: historia, arte, gastronomía, leyendas locales, naturaleza o incluso recorridos personalizados para quienes buscan algo único. Me considero no solo un narrador de historias, sino también un puente entre culturas. Hablo varios idiomas y disfruto creando un ambiente acogedor, cercano y enriquecedor, donde cada visitante se sienta cómodo, bien atendido y plenamente involucrado en la experiencia. Ya sea paseando por callejuelas históricas, admirando la arquitectura de una ciudad vibrante o contemplando un atardecer desde un mirador escondido, siempre busco despertar la curiosidad, el asombro y el disfrute genuino. Como guía turístico professional, mi compromiso es ofrecer calidad, seguridad, amabilidad y un conocimiento profundo de cada lugar, además de una atención personalizada y cercana. Porque no se trata solo de visitar un sitio, sino de entenderlo, sentirlo y llevarlo contigo en la memoria como parte de una vivencia irrepetible. Si estás buscando algo más que una simple visita, estaré encantado de acompañarte en esta aventura. Descubramos juntos la magia que se esconde en cada rincón.",
        type=enumProf.freelance,business_name="GreatTourism",
        tax_address="Calle Turismo 3",nuss="NUSS789012"
    )]
    db.session.add_all(profs)
    db.session.commit()

    # Clientes
    clients = [
        Clients(user_id=users[0].id,address="Calle Sol 1",
            city="Madrid",birthdate=datetime(1990, 5, 20),
            gender=enumClts.female),
        Clients(user_id=users[1].id,address="Calle Luna 2",
            city="Barcelona",birthdate=datetime(1988, 7, 15),
            gender=enumClts.male),
        Clients(user_id=users[2].id,address="Avenida del Mar 3",
            city="Valencia",birthdate=datetime(1992, 3, 10),
            gender=enumClts.female),
        Clients(user_id=users[3].id,address="Calle Río 4",
            city="Sevilla",birthdate=datetime(1985, 12, 1),
            gender=enumClts.male),
        Clients(user_id=users[4].id,address="Plaza Mayor 5",
            city="Bilbao",birthdate=datetime(1995, 8, 30),
            gender=enumClts.female),
        Clients(user_id=users[5].id,address="Calle Olivo 6",
            city="Granada",birthdate=datetime(1991, 2, 18),
            gender=enumClts.male),
        Clients(user_id=users[6].id,address="Avenida Paz 7",
            city="Zaragoza",birthdate=datetime(1993, 11, 5),
            gender=enumClts.female),
        Clients(user_id=users[7].id,address="Calle Jardín 8",
            city="Málaga",birthdate=datetime(1989, 6, 22),
            gender=enumClts.male),
        Clients(user_id=users[8].id,address="Calle Lago 9",
            city="Alicante",birthdate=datetime(1994, 9, 14),
            gender=enumClts.female),
        Clients(user_id=users[9].id,address="Avenida Sierra 10",
            city="Santander",birthdate=datetime(1987, 4, 27),
            gender=enumClts.male),
    ]

    db.session.add_all(clients)
    db.session.commit()

    # Info de actividades
    info_activities = [
        Info_activity(professional_id=profs[0].user_id,name="Yoga en el Parque Gulliver", location="Valencia",
            desc="Descubre el equilibrio perfecto entre cuerpo, mente y naturaleza con nuestra sesión de yoga al aire libre. Respira profundamente, estira tu cuerpo y deja que la energía del entorno natural te revitalice por completo. Rodeados de aire fresco, luz natural y sonidos relajantes, practicaremos posturas (asanas), ejercicios de respiración (pranayama) y técnicas de relajación guiada para reconectar contigo mismo y encontrar paz interior.  No importa si eres principiante o tienes experiencia: adaptamos la práctica a todos los niveles, fomentando un espacio seguro, tranquilo y sin juicios, donde cada persona pueda avanzar a su ritmo. Solo necesitas una esterilla, ropa cómoda y muchas ganas de sentirte bien.  Las sesiones están dirigidas por un instructor certificado, que te acompañará paso a paso para que disfrutes al máximo de esta experiencia consciente, conectando con el aquí y el ahora.  Únete a nosotros y regálate un momento de calma, armonía y bienestar en plena naturaleza. Tu cuerpo lo agradecerá. Tu mente también.",
            type=enumInfo.sport),
        Info_activity(professional_id=profs[2].user_id,name="Ruta turística", location="Toledo",
            desc="Embárcate en una fascinante visita guiada por el centro histórico de Toledo, una ciudad declarada Patrimonio de la Humanidad por la UNESCO y repleta de historia, arte y cultura. Descubre sus callejuelas medievales, sus impresionantes monumentos y las huellas de las tres culturas —cristiana, judía y musulmana— que convivieron durante siglos. Nuestro guía professional te acompañará en un recorrido ameno y enriquecedor por lugares emblemáticos como la Catedral Primada, el Alcázar, la Judería y las antiguas murallas.  Conocerás curiosidades, leyendas y detalles que no aparecen en las guías turísticas, todo en un ambiente cercano y participativo. Ideal para amantes de la historia, familias, grupos o visitantes que deseen una experiencia auténtica y profunda.  Ven a descubrir por qué Toledo es conocida como la “Ciudad de las Tres Culturas” y déjate sorprender por su encanto atemporal. Una experiencia que recordarás mucho después de regresar a casa.",
            type=enumInfo.tourism),
        Info_activity(professional_id=profs[1].user_id,name="Taller de cocina saludable", location="Madrid",
            desc="Aprende recetas fáciles y sanas",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Senderismo en la sierra", location="Granada",
            desc="Ruta de senderismo para todos los niveles",type=enumInfo.sport),
        Info_activity(professional_id=profs[1].user_id,name="Clase de pilates", location="Valencia",
            desc="Pilates para mejorar tu postura",type=enumInfo.sport),
        Info_activity(professional_id=profs[2].user_id,name="Visita a museo del Prado", location="Madrid",
            desc="Recorrido cultural por los principales museos",type=enumInfo.tourism),
        Info_activity(professional_id=profs[1].user_id,name="Taller de fotografía", location="Madrid",
            desc="Aprende a sacar el máximo partido a tu cámara",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Clase de spinning", location="Valencia",
            desc="Entrenamiento cardiovascular intenso",type=enumInfo.sport),
        Info_activity(professional_id=profs[2].user_id,name="Tour gastronómico", location="Granada",
            desc="Descubre los mejores sabores locales",type=enumInfo.tourism),
        Info_activity(professional_id=profs[1].user_id,name="Taller de mindfulness", location="Toledo",
            desc="Aprende técnicas de relajación y meditación",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Clase de zumba", location="Madrid",
            desc="Baila y haz ejercicio al ritmo de la música",type=enumInfo.sport),
        Info_activity(professional_id=profs[1].user_id,name="Excursión a la playa", location="Valencia",
            desc="Día de actividades y juegos en la playa",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Ruta en bicicleta", location="Granada",
            desc="Paseo en bici por la ciudad",type=enumInfo.sport),
        Info_activity(professional_id=profs[2].user_id,name="Visita guiada al casco antiguo", location="Granada",
            desc="Historia y curiosidades del centro histórico",type=enumInfo.tourism),
        Info_activity(professional_id=profs[1].user_id,name="Taller de pintura", location="Madrid",
            desc="Desarrolla tu creatividad con la pintura",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Clase de running", location="Toledo",
            desc="Entrenamiento para corredores principiantes",type=enumInfo.sport),
        Info_activity(professional_id=profs[2].user_id,name="Tour de arquitectura", location="Toledo",
            desc="Descubre los edificios más emblemáticos",type=enumInfo.tourism),
        Info_activity(professional_id=profs[1].user_id,name="Taller de escritura creativa", location="Valencia",
            desc="Mejora tus habilidades narrativas",type=enumInfo.leisure),
        Info_activity(professional_id=profs[0].user_id,name="Clase de natación", location="Madrid",
            desc="Aprende a nadar o mejora tu técnica",type=enumInfo.sport),
        Info_activity(professional_id=profs[1].user_id,name="Visita a bodegas", location="Toledo",
            desc="Cata de vinos y recorrido por bodegas locales",type=enumInfo.tourism),
    ]
    db.session.add_all(info_activities)
    db.session.commit()

    # Actividades
    actividades = [
        Activities(info_id=info_activities[0].id, price=12.0, slots=15, is_finished=True,
            meeting_point="Calle Gulliver, Valencia", is_active=True,
            start_date=datetime(2025, 5, 10, 10, 0), end_date=datetime(2025, 5, 10, 12, 0)
        ),
        Activities(info_id=info_activities[0].id, price=15.0, slots=18, is_finished=False,
            meeting_point="Calle Gulliver, Valencia 3", is_active=True,
            start_date=datetime(2025, 5, 13, 10, 0), end_date=datetime(2025, 5, 13, 12, 0)
        ),
        Activities(info_id=info_activities[1].id, price=18.0, slots=10, is_finished=True,
            meeting_point="Plaza Zocodover, Toledo", is_active=True,
            start_date=datetime(2025, 5, 11, 11, 0), end_date=datetime(2025, 5, 11, 13, 0)
        ),
        Activities(info_id=info_activities[2].id, price=20.0, slots=12, is_finished=True,
            meeting_point="Calle Gran Vía, Madrid", is_active=True,
            start_date=datetime(2025, 5, 12, 17, 0), end_date=datetime(2025, 5, 12, 19, 0)
        ),
        Activities(info_id=info_activities[3].id, price=10.0, slots=20, is_finished=True,
            meeting_point="Calle Sierra Nevada, Granada", is_active=True,
            start_date=datetime(2025, 5, 13, 9, 0), end_date=datetime(2025, 5, 13, 13, 0)
        ),
        Activities(info_id=info_activities[4].id, price=15.0, slots=14, is_finished=True,
            meeting_point="Avenida del Puerto, Valencia", is_active=True,
            start_date=datetime(2025, 5, 14, 18, 0), end_date=datetime(2025, 5, 14, 20, 0)
        ),
        Activities(info_id=info_activities[5].id, price=22.0, slots=8, is_finished=False,
            meeting_point="Paseo del Prado, Madrid", is_active=True,
            start_date=datetime(2025, 6, 15, 16, 0), end_date=datetime(2025, 6, 15, 18, 0)
        ),
        Activities(info_id=info_activities[6].id, price=16.0, slots=10, is_finished=False,
            meeting_point="Calle Alcalá, Madrid", is_active=True,
            start_date=datetime(2025, 6, 16, 10, 0), end_date=datetime(2025, 6, 16, 12, 0)
        ),
        Activities(info_id=info_activities[7].id, price=14.0, slots=18, is_finished=False,
            meeting_point="Avenida Aragón, Valencia", is_active=True,
            start_date=datetime(2025, 6, 17, 9, 0), end_date=datetime(2025, 6, 17, 11, 0)
        ),
        Activities(info_id=info_activities[8].id, price=19.0, slots=9, is_finished=False,
            meeting_point="Calle Elvira, Granada", is_active=True,
            start_date=datetime(2025, 6, 18, 19, 0), end_date=datetime(2025, 6, 18, 21, 0)
        ),
        Activities(info_id=info_activities[9].id, price=13.0, slots=16, is_finished=False,
            meeting_point="Calle Comercio, Toledo", is_active=True,
            start_date=datetime(2025, 6, 19, 17, 0), end_date=datetime(2025, 6, 19, 19, 0)
        ),
        Activities(info_id=info_activities[10].id, price=11.0, slots=20, is_finished=False,
            meeting_point="Calle Arenal, Madrid", is_active=True,
            start_date=datetime(2025, 6, 20, 10, 0), end_date=datetime(2025, 6, 20, 12, 0)
        ),
        Activities(info_id=info_activities[11].id, price=17.0, slots=13, is_finished=False,
            meeting_point="Playa Malvarrosa, Valencia", is_active=True,
            start_date=datetime(2025, 6, 21, 18, 0), end_date=datetime(2025, 6, 21, 20, 0)
        ),
        Activities(info_id=info_activities[12].id, price=12.0, slots=15, is_finished=False,
            meeting_point="Paseo del Violón, Granada", is_active=True,
            start_date=datetime(2025, 6, 22, 9, 0), end_date=datetime(2025, 6, 22, 11, 0)
        ),
        Activities(info_id=info_activities[13].id, price=21.0, slots=10, is_finished=False,
            meeting_point="Plaza Nueva, Granada", is_active=True,
            start_date=datetime(2025, 6, 23, 17, 0), end_date=datetime(2025, 6, 23, 19, 0)
        ),
        Activities(info_id=info_activities[14].id, price=13.0, slots=14, is_finished=False,
            meeting_point="Calle Serrano, Madrid", is_active=True,
            start_date=datetime(2025, 6, 24, 16, 0), end_date=datetime(2025, 6, 24, 18, 0)
        ),
        Activities(info_id=info_activities[15].id, price=15.0, slots=12, is_finished=False,
            meeting_point="Parque Tres Culturas, Toledo", is_active=True,
            start_date=datetime(2025, 6, 25, 10, 0), end_date=datetime(2025, 6, 25, 12, 0)
        ),
        Activities(info_id=info_activities[16].id, price=18.0, slots=11, is_finished=False,
            meeting_point="Calle Reyes Católicos, Toledo", is_active=True,
            start_date=datetime(2025, 6, 26, 11, 0), end_date=datetime(2025, 6, 26, 13, 0)
        ),
        Activities(info_id=info_activities[17].id, price=16.0, slots=13, is_finished=False,
            meeting_point="Calle Colón, Valencia", is_active=True,
            start_date=datetime(2025, 6, 27, 18, 0), end_date=datetime(2025, 6, 27, 20, 0)
        ),
        Activities(info_id=info_activities[18].id, price=14.0, slots=17, is_finished=False,
            meeting_point="Piscina Municipal, Madrid", is_active=True,
            start_date=datetime(2025, 6, 28, 9, 0), end_date=datetime(2025, 6, 28, 11, 0)
        ),
        Activities(info_id=info_activities[19].id, price=20.0, slots=8, is_finished=False,
            meeting_point="Calle Bodegas, Toledo", is_active=True,
            start_date=datetime(2025, 6, 29, 17, 0), end_date=datetime(2025, 6, 29, 19, 0)
        ),
    ]
    db.session.add_all(actividades)
    db.session.commit()

    # Inscripciones
    inscriptions = [
        Inscriptions(user_id=clients[0].user_id, activity_id=actividades[0].id),
        Inscriptions(user_id=clients[1].user_id, activity_id=actividades[0].id),
        Inscriptions(user_id=clients[2].user_id, activity_id=actividades[1].id),
        Inscriptions(user_id=clients[3].user_id, activity_id=actividades[1].id),
        Inscriptions(user_id=clients[4].user_id, activity_id=actividades[2].id),
        Inscriptions(user_id=clients[5].user_id, activity_id=actividades[2].id),
        Inscriptions(user_id=clients[6].user_id, activity_id=actividades[3].id),
        Inscriptions(user_id=clients[7].user_id, activity_id=actividades[3].id),
        Inscriptions(user_id=clients[8].user_id, activity_id=actividades[4].id),
        Inscriptions(user_id=clients[9].user_id, activity_id=actividades[4].id),
        Inscriptions(user_id=clients[0].user_id, activity_id=actividades[5].id),
        Inscriptions(user_id=clients[1].user_id, activity_id=actividades[5].id),
        Inscriptions(user_id=clients[2].user_id, activity_id=actividades[6].id),
        Inscriptions(user_id=clients[3].user_id, activity_id=actividades[6].id),
        Inscriptions(user_id=clients[4].user_id, activity_id=actividades[7].id),
        Inscriptions(user_id=clients[5].user_id, activity_id=actividades[7].id),
        Inscriptions(user_id=clients[6].user_id, activity_id=actividades[8].id),
        Inscriptions(user_id=clients[7].user_id, activity_id=actividades[8].id),
        Inscriptions(user_id=clients[8].user_id, activity_id=actividades[9].id),
        Inscriptions(user_id=clients[9].user_id, activity_id=actividades[9].id),
        Inscriptions(user_id=clients[0].user_id, activity_id=actividades[10].id),
        Inscriptions(user_id=clients[1].user_id, activity_id=actividades[10].id),
        Inscriptions(user_id=clients[2].user_id, activity_id=actividades[11].id),
        Inscriptions(user_id=clients[3].user_id, activity_id=actividades[11].id),
        Inscriptions(user_id=clients[4].user_id, activity_id=actividades[12].id),
        Inscriptions(user_id=clients[5].user_id, activity_id=actividades[12].id),
        Inscriptions(user_id=clients[6].user_id, activity_id=actividades[13].id),
        Inscriptions(user_id=clients[7].user_id, activity_id=actividades[13].id),
        Inscriptions(user_id=clients[8].user_id, activity_id=actividades[14].id),
        Inscriptions(user_id=clients[9].user_id, activity_id=actividades[14].id),
        Inscriptions(user_id=clients[0].user_id, activity_id=actividades[15].id),
        Inscriptions(user_id=clients[1].user_id, activity_id=actividades[15].id),
        Inscriptions(user_id=clients[2].user_id, activity_id=actividades[16].id),
        Inscriptions(user_id=clients[3].user_id, activity_id=actividades[16].id),
        Inscriptions(user_id=clients[4].user_id, activity_id=actividades[17].id),
        Inscriptions(user_id=clients[5].user_id, activity_id=actividades[17].id),
        Inscriptions(user_id=clients[6].user_id, activity_id=actividades[18].id),
        Inscriptions(user_id=clients[7].user_id, activity_id=actividades[18].id),
        Inscriptions(user_id=clients[8].user_id, activity_id=actividades[19].id),
        Inscriptions(user_id=clients[9].user_id, activity_id=actividades[19].id),
        # Más inscripciones para variedad
        Inscriptions(user_id=clients[0].user_id, activity_id=actividades[1].id),
        Inscriptions(user_id=clients[1].user_id, activity_id=actividades[2].id),
        Inscriptions(user_id=clients[2].user_id, activity_id=actividades[3].id),
        Inscriptions(user_id=clients[3].user_id, activity_id=actividades[4].id),
        Inscriptions(user_id=clients[4].user_id, activity_id=actividades[5].id),
        Inscriptions(user_id=clients[5].user_id, activity_id=actividades[6].id),
        Inscriptions(user_id=clients[6].user_id, activity_id=actividades[7].id),
        Inscriptions(user_id=clients[7].user_id, activity_id=actividades[8].id),
    ]

    db.session.add_all(inscriptions)
    db.session.commit()

    # Favoritos
    favourites = [
        Favourites(client_id=clients[0].user_id, info_activity_id=info_activities[0].id),
        Favourites(client_id=clients[1].user_id, info_activity_id=info_activities[0].id),
        Favourites(client_id=clients[2].user_id, info_activity_id=info_activities[1].id),
        Favourites(client_id=clients[3].user_id, info_activity_id=info_activities[2].id),
        Favourites(client_id=clients[4].user_id, info_activity_id=info_activities[3].id),
        Favourites(client_id=clients[5].user_id, info_activity_id=info_activities[4].id),
        Favourites(client_id=clients[6].user_id, info_activity_id=info_activities[5].id),
        Favourites(client_id=clients[7].user_id, info_activity_id=info_activities[6].id),
        Favourites(client_id=clients[8].user_id, info_activity_id=info_activities[7].id),
        Favourites(client_id=clients[9].user_id, info_activity_id=info_activities[8].id),
        Favourites(client_id=clients[0].user_id, info_activity_id=info_activities[9].id),
        Favourites(client_id=clients[1].user_id, info_activity_id=info_activities[10].id),
        Favourites(client_id=clients[2].user_id, info_activity_id=info_activities[11].id),
        Favourites(client_id=clients[3].user_id, info_activity_id=info_activities[12].id),
        Favourites(client_id=clients[4].user_id, info_activity_id=info_activities[13].id),
        Favourites(client_id=clients[5].user_id, info_activity_id=info_activities[14].id),
        Favourites(client_id=clients[6].user_id, info_activity_id=info_activities[15].id),
        Favourites(client_id=clients[7].user_id, info_activity_id=info_activities[16].id),
        Favourites(client_id=clients[8].user_id, info_activity_id=info_activities[17].id),
        Favourites(client_id=clients[9].user_id, info_activity_id=info_activities[18].id),
    ]
    db.session.add_all(favourites)
    db.session.commit()

    # Media
    media = [
        Media(info_activity_id=info_activities[0].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[0].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[1].id, url="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[1].id, url="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[2].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[2].id, url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[3].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[3].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[4].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[4].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[5].id, url="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[5].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[6].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[6].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[7].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[7].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[8].id, url="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[8].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[9].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[9].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[10].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[10].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[11].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[11].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[12].id, url="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[12].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[13].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[13].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[14].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[14].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[15].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[15].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[16].id, url="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[16].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[17].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[17].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[18].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[18].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[19].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[19].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[0].id, url="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[1].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[2].id, url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[3].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[4].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[5].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[6].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[7].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[8].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[9].id, url="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[10].id, url="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[11].id, url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[12].id, url="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[13].id, url="https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[14].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[15].id, url="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[16].id, url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[17].id, url="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[18].id, url="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?fit=crop&w=600&q=80"),
        Media(info_activity_id=info_activities[19].id, url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80"),
    ]
    db.session.add_all(media)
    db.session.commit()

    # Reviews
    reviews = [
        Reviews(info_activity_id=info_activities[0].id, profesional_id=profs[0].user_id, client_id=clients[0].user_id, profesional_rating=4.5, activity_rating=None, profesional_message="Muy profesional", activity_message=""),
        Reviews(info_activity_id=info_activities[1].id, profesional_id=profs[2].user_id, client_id=clients[1].user_id, profesional_rating=None, activity_rating=4.5, profesional_message="", activity_message="Muy interesante"),
        Reviews(info_activity_id=info_activities[2].id, profesional_id=profs[1].user_id, client_id=clients[2].user_id, profesional_rating=4.0, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[3].id, profesional_id=profs[0].user_id, client_id=clients[3].user_id, profesional_rating=None, activity_rating=5.0, profesional_message="", activity_message="Ruta preciosa"),
        Reviews(info_activity_id=info_activities[4].id, profesional_id=profs[1].user_id, client_id=clients[4].user_id, profesional_rating=5.0, activity_rating=None, profesional_message="Buen trato", activity_message=""),
        Reviews(info_activity_id=info_activities[5].id, profesional_id=profs[2].user_id, client_id=clients[5].user_id, profesional_rating=None, activity_rating=4.8, profesional_message="", activity_message="Museo espectacular"),
        Reviews(info_activity_id=info_activities[6].id, profesional_id=profs[1].user_id, client_id=clients[6].user_id, profesional_rating=3.0, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[7].id, profesional_id=profs[0].user_id, client_id=clients[7].user_id, profesional_rating=None, activity_rating=4.2, profesional_message="", activity_message="Muy motivador"),
        Reviews(info_activity_id=info_activities[8].id, profesional_id=profs[2].user_id, client_id=clients[8].user_id, profesional_rating=None, activity_rating=4.0, profesional_message="", activity_message="Buena comida"),
        Reviews(info_activity_id=info_activities[9].id, profesional_id=profs[1].user_id, client_id=clients[9].user_id, profesional_rating=4.1, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[10].id, profesional_id=profs[0].user_id, client_id=clients[0].user_id, profesional_rating=None, activity_rating=5.0, profesional_message="", activity_message="Muy divertido"),
        Reviews(info_activity_id=info_activities[11].id, profesional_id=profs[1].user_id, client_id=clients[1].user_id, profesional_rating=4.0, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[12].id, profesional_id=profs[0].user_id, client_id=clients[2].user_id, profesional_rating=None, activity_rating=None, profesional_message="Muy buena ruta", activity_message=""),
        Reviews(info_activity_id=info_activities[13].id, profesional_id=profs[2].user_id, client_id=clients[3].user_id, profesional_rating=None, activity_rating=3.5, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[14].id, profesional_id=profs[1].user_id, client_id=clients[4].user_id, profesional_rating=4.8, activity_rating=None, profesional_message="Creativo", activity_message=""),
        Reviews(info_activity_id=info_activities[15].id, profesional_id=profs[0].user_id, client_id=clients[5].user_id, profesional_rating=None, activity_rating=4.0, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[16].id, profesional_id=profs[2].user_id, client_id=clients[6].user_id, profesional_rating=None, activity_rating=4.3, profesional_message="", activity_message="Arquitectura impresionante"),
        Reviews(info_activity_id=info_activities[17].id, profesional_id=profs[1].user_id, client_id=clients[7].user_id, profesional_rating=3.9, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[18].id, profesional_id=profs[0].user_id, client_id=clients[8].user_id, profesional_rating=None, activity_rating=5.0, profesional_message="", activity_message="Aprendí mucho"),
        Reviews(info_activity_id=info_activities[19].id, profesional_id=profs[1].user_id, client_id=clients[9].user_id, profesional_rating=4.0, activity_rating=None, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[0].id, profesional_id=profs[0].user_id, client_id=clients[1].user_id, profesional_rating=None, activity_rating=4.7, profesional_message="", activity_message="Muy relajante"),
        Reviews(info_activity_id=info_activities[1].id, profesional_id=profs[2].user_id, client_id=clients[2].user_id, profesional_rating=4.2, activity_rating=None, profesional_message="Buen guía", activity_message=""),
        Reviews(info_activity_id=info_activities[2].id, profesional_id=profs[1].user_id, client_id=clients[3].user_id, profesional_rating=None, activity_rating=3.5, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[3].id, profesional_id=profs[0].user_id, client_id=clients[4].user_id, profesional_rating=3.8, activity_rating=None, profesional_message="", activity_message="Ruta exigente"),
        Reviews(info_activity_id=info_activities[4].id, profesional_id=profs[1].user_id, client_id=clients[5].user_id, profesional_rating=None, activity_rating=4.1, profesional_message="", activity_message=""),
        Reviews(info_activity_id=info_activities[5].id, profesional_id=profs[2].user_id, client_id=clients[6].user_id, profesional_rating=4.5, activity_rating=None, profesional_message="Muy ameno", activity_message=""),
        Reviews(info_activity_id=info_activities[6].id, profesional_id=profs[1].user_id, client_id=clients[7].user_id, profesional_rating=None, activity_rating=4.0, profesional_message="", activity_message="Interesante"),
        Reviews(info_activity_id=info_activities[7].id, profesional_id=profs[0].user_id, client_id=clients[8].user_id, profesional_rating=4.9, activity_rating=None, profesional_message="Motivador", activity_message=""),
        Reviews(info_activity_id=info_activities[8].id, profesional_id=profs[2].user_id, client_id=clients[9].user_id, profesional_rating=None, activity_rating=4.2, profesional_message="", activity_message="Genial"),
        Reviews(info_activity_id=info_activities[9].id, profesional_id=profs[1].user_id, client_id=clients[0].user_id, profesional_rating=4.0, activity_rating=5.0, profesional_message="Muy educado", activity_message="Muy útil"),
    ]
    db.session.add_all(reviews)
    db.session.commit()

    # Reports
    reports = [
        Reports(
            message="El profesional llegó tarde y no avisó.",
            user_id=clients[0].user_id,
            target_type=enumReps.user,
            profesional_target_id=profs[0].user_id,
            activity_target_id=None
        ),
        Reports(
            message="La actividad no se realizó como estaba descrita.",
            user_id=clients[1].user_id,
            target_type=enumReps.activity,
            profesional_target_id=None,
            activity_target_id=info_activities[2].id
        ),
        Reports(
            message="El profesional fue poco amable durante la actividad.",
            user_id=clients[2].user_id,
            target_type=enumReps.user,
            profesional_target_id=profs[1].user_id,
            activity_target_id=None
        ),
        Reports(
            message="La actividad fue cancelada sin previo aviso.",
            user_id=clients[3].user_id,
            target_type=enumReps.activity,
            profesional_target_id=None,
            activity_target_id=info_activities[5].id
        )]
    db.session.add_all(reports)
    db.session.commit()

    # Administradores

    user = Users( email="admin@admin.com", password=generate_password_hash("1234"))
    db.session.add(user)
    db.session.commit()

    client = Clients (user_id=user.id, username="admintodopoderoso",name="Admin",surname="Pérez",telephone="666888777",NID="90289510A",avatar_url="https://res.cloudinary.com/dsn6qtd9g/image/upload/v1750721682/0_y2kkuy.jpg",
            address="Edificio Vengadores, New York", city="New York", country="Estados Unidos", birthdate=datetime(1990,1,4), gender=enumClts.male)
    admin = Administrators(user_id=user.id)
    db.session.add(client)

    db.session.add(admin)
    db.session.commit()

print("✅ Datos de ejemplo insertados correctamente.")