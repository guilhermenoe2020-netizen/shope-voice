/**
 * Dicionário de categorias de produto -> termos de SEO relacionados.
 * Cada categoria contribui hashtags de nicho (não genéricas), que se somam
 * às hashtags derivadas diretamente do nome do produto.
 */
export const CATEGORY_KEYWORDS = {
  beleza: ["skincare", "cuidadosdapele", "maquiagem", "rotinadebeleza", "belezanatural", "dicasdebeleza", "cosmeticos", "antienvelhecimento", "peledoces", "belezaonline", "skincareroutine", "produtosdebeleza", "belezanatiktok"],
  cabelo: ["cuidadoscomcabelo", "cabelosaudavel", "haircare", "capilar", "cabeloscacheados", "cabeloliso", "hidratacaocapilar", "transformacaocapilar", "cronogramacapilar", "cabelosdospositivos"],
  unhas: ["nailart", "esmaltacao", "unhasdecoradas", "manicure", "cuidadocomunhas", "unhasperfeitas", "nailsdesign"],
  eletronicos: ["eletronicos", "gadget", "tecnologia", "inovacao", "acessoriostech", "techlover", "eletronicosbrasil", "gadgetsdodia", "achadostech", "produtostecnologicos"],
  celular: ["acessoriosdecelular", "capinha", "smartphone", "mobiletech", "celularnovo", "acessoriosdecelularshopee", "capinhapersonalizada"],
  informatica: ["gamer", "setupgamer", "perifericos", "notebook", "acessoriosgamer", "pcgamer", "setupdeconjogos", "acessoriosdeinformatica"],
  audio: ["fonedeouvido", "audioportatil", "musicaboa", "somdequalidade", "caixadesom", "fonebluetooth", "audiofilo"],
  casa: ["casaorganizada", "decoracao", "utilidadesdomesticas", "organizacaodacasa", "decoracaodecasa", "casanova", "homedecor", "organizacaoemcasa", "casapratica", "decoracaocriativa"],
  cozinha: ["utensiliosdecozinha", "cozinhapratica", "gadgetdecozinha", "receitasfaceis", "cozinhandoemcasa", "utensiliosuteis", "cozinhamoderna", "acessoriosdecozinha"],
  limpeza: ["produtosdelimpeza", "limpezadecasa", "faxina", "organizacaoelimpeza", "casalimpa", "limpezapesada", "faxinacompleta"],
  fitness: ["vidafitness", "treino", "saudeebemestar", "acessoriosfitness", "academia", "emagrecimento", "vidasaudavel", "treinoemcasa", "musculacao", "fitnessmotivation", "crossfit"],
  moda: ["moda", "estilo", "acessoriosfemininos", "modaacessivel", "modafeminina", "modamasculina", "lookdodia", "tendenciademoda", "estilopessoal", "outfit", "modabrasileira"],
  bolsaseacessorios: ["bolsa", "carteira", "necessaire", "acessoriosdemoda", "bolsafeminina", "carteiramasculina"],
  joias: ["colar", "brinco", "anel", "pulseira", "semijoias", "joiasfolheadas", "acessoriosdeluxo", "bijuterias", "joiasfinas"],
  oculos: ["oculosdesol", "oculosdegrau", "acessoriosdeoculos", "oculosfeminino", "oculosmasculino"],
  relogios: ["relogio", "relogiomasculino", "relogiofeminino", "acessoriosderelogio", "relogiosmart", "relogiodigital"],
  bebe: ["mamaebebe", "produtosparabebe", "maternidade", "enxovaldobebe", "bebereborn", "cuidadoscombebe", "gravidez", "bebecomforto", "recemnascido"],
  infantil: ["brinquedoseducativos", "criancas", "brincadeiras", "presenteparacrianca", "diversaoinfantil", "brinquedosinterativos", "brinquedosdivertidos", "jogosinfantis", "pelucia"],
  pet: ["petshop", "produtosparapet", "amantesdepet", "caes", "gatos", "acessoriosparapet", "petlover", "cachorro", "gatinho", "petfeliz", "adestramento"],
  automotivo: ["acessoriosautomotivos", "carro", "utilidadesautomotivas", "carrosbrasil", "acessoriosparacarro", "tuning", "carrolover", "acessoriosinternoscarro"],
  moto: ["motociclismo", "acessoriosparamoto", "motoqueiro", "motovida", "bikersbrasil"],
  escritorio: ["homeoffice", "organizacaodeescritorio", "produtividade", "materialdeescritorio", "escritoriocriativo", "trabalhoremoto", "escritoriomoderno"],
  papelaria: ["papelaria", "planner", "materialescolar", "escritanacaneta", "papelariacriativa", "papelariafofa", "voltaasaulas"],
  iluminacao: ["iluminacaodecorativa", "luzled", "decoracaocomluz", "luminaria", "iluminacaoambiente", "ledrgb", "decoracaocomled"],
  ferramentas: ["ferramentas", "facavocemesmo", "diy", "marcenaria", "kitdeferramentas", "reformaemcasa", "ferramentaseletricas", "bricolagem"],
  jardim: ["jardinagem", "plantas", "jardimdecasa", "vasosdeplantas", "paisagismo", "hortacaseira", "amantesdeplantas"],
  esportes: ["esportes", "acessoriosesportivos", "aventura", "vidaativa", "esporteemcasa", "esportesradicais", "vidasaudavel"],
  camping: ["camping", "trilha", "aventuraoutdoor", "acessoriosdecamping", "vidaoutdoor", "trilheiro"],
  viagem: ["viagem", "malademviagem", "acessoriosdeviagem", "mochila", "turismo", "viagemdesonho", "malademao"],
  presentes: ["presentecriativo", "ideiadepresente", "presenteparaela", "presenteparaele", "presenteperfeito", "presentedeaniversario"],
  festa: ["decoracaodefesta", "festainfantil", "artigosdefesta", "aniversario", "festadeaniversario", "decoracaotematica"],
  organizacao: ["organizadordearmario", "organizacaopratica", "minimalismo", "organizese", "organizacaocriativa", "espacoorganizado"],
  saude: ["saude", "bemestar", "cuidadoscomasaude", "vidasaudavel", "autocuidado", "qualidadedevida", "saudeemcasa"],
  higiene: ["higienepessoal", "cuidadospessoais", "produtosdehigiene", "higieneintima", "cuidadodiario"],
  eletrodomesticos: ["eletrodomesticos", "casapratica", "facilitadordotidiano", "eletrodomesticosinteligentes", "casaconectada"],
  costura: ["costura", "artesanato", "diy", "maquinadecostura", "costurafacil", "artesanal"],
  cabelosmasculino: ["barbearia", "cuidadosmasculinos", "barba", "cortemasculino", "grooming"],
  suplementos: ["suplementos", "whey", "nutricaoesportiva", "vitaminas", "creatina", "hipertrofia"],
  livros: ["livros", "leitura", "booklover", "literatura", "leituradodiaia"],
  seguranca: ["seguranca", "camerasdeseguranca", "monitoramento", "segurancaresidencial", "alarme"],
  arteecraft: ["artesanato", "diy", "artesdecoradas", "handmade", "feitoamao"],
  eletroportateis: ["portatil", "praticidade", "tecnologiaportatil", "acessoriosportateis"],
  natal: ["decoracaodenatal", "natal", "espiritonatalino", "presentedenatal"],
  cha: ["chadebebe", "chademaquinaria", "chadecozinha", "decoracaodecha"],
};

/**
 * Mapeia palavras encontradas no nome do produto para uma categoria,
 * permitindo detectar o nicho sem depender de IA externa.
 * Inclui variações no singular/plural e termos comuns em anúncios de Shopee.
 */
export const KEYWORD_TO_CATEGORY = {
  // Cabelo
  shampoo: "cabelo", condicionador: "cabelo", escova: "cabelo", escovas: "cabelo",
  chapinha: "cabelo", secador: "cabelo", secadores: "cabelo", modelador: "cabelo",
  babyliss: "cabelo", mascara: "cabelo", mascaras: "cabelo", leavein: "cabelo",
  progressiva: "cabelo", oleocapilar: "cabelo", finalizador: "cabelo",

  // Beleza / Skincare
  creme: "beleza", cremes: "beleza", serum: "beleza", batom: "beleza", batons: "beleza",
  perfume: "beleza", perfumes: "beleza", maquiagem: "beleza", maquiagens: "beleza",
  hidratante: "beleza", protetorsolar: "beleza", esponja: "beleza", esponjas: "beleza",
  pincel: "beleza", pinceis: "beleza", base: "beleza", corretivo: "beleza",
  pomade: "beleza", gloss: "beleza", paletadesombras: "beleza", delineador: "beleza",
  mascaradecilios: "beleza", primer: "beleza",

  // Unhas
  esmalte: "unhas", esmaltes: "unhas", lixa: "unhas", alicate: "unhas",
  unhapostica: "unhas", unhasposticas: "unhas", capsulaunhas: "unhas",

  // Audio / Eletrônicos / Celular
  fone: "audio", fones: "audio", caixadesom: "audio", caixasdesom: "audio",
  microfone: "audio", headset: "audio", carregador: "eletronicos",
  carregadores: "eletronicos", cabo: "eletronicos", cabos: "eletronicos",
  smartwatch: "eletronicos", powerbank: "eletronicos", adaptador: "eletronicos",
  capinha: "celular", capinhas: "celular", pelicula: "celular", peliculas: "celular",
  suportecelular: "celular", tripe: "celular", popsocket: "celular", gimbal: "celular",

  // Informática / gamer
  mouse: "informatica", mouses: "informatica", teclado: "informatica",
  teclados: "informatica", notebook: "informatica", webcam: "informatica",
  headsetgamer: "informatica", cadeiragamer: "informatica", mousepad: "informatica",
  hub: "informatica", pendrive: "informatica", ssd: "informatica",

  // Iluminação
  luminaria: "iluminacao", luminarias: "iluminacao", led: "iluminacao",
  fitaled: "iluminacao", lampada: "iluminacao", lampadas: "iluminacao", abajur: "iluminacao",
  pisca: "iluminacao", luminariadeled: "iluminacao",

  // Cozinha
  panela: "cozinha", panelas: "cozinha", airfryer: "cozinha", liquidificador: "cozinha",
  faca: "cozinha", facas: "cozinha", jogodetachos: "cozinha", garrafatermica: "cozinha",
  potedevidro: "cozinha", potes: "cozinha", espremedor: "cozinha", cafeteira: "cozinha",
  sanduicheira: "cozinha", batedeira: "cozinha", conjuntodetigelas: "cozinha",
  descascador: "cozinha", cortador: "cozinha", forma: "cozinha", formas: "cozinha",

  // Casa
  tapete: "casa", tapetes: "casa", organizador: "casa", organizadores: "casa",
  cesto: "casa", cestos: "casa", almofada: "casa", almofadas: "casa", cortina: "casa",
  cortinas: "casa", quadro: "casa", quadros: "casa", vaso: "casa", vasos: "casa",
  relogiodeparede: "casa", espelho: "casa", espelhos: "casa", enfeite: "casa",

  // Limpeza
  vassoura: "limpeza", esfregao: "limpeza", panodemicrofibra: "limpeza",
  desinfetante: "limpeza", aspirador: "limpeza", rodo: "limpeza", balde: "limpeza",

  // Fitness
  halter: "fitness", halteres: "fitness", elastico: "fitness", tenis: "fitness",
  garrafa: "fitness", esteira: "fitness", corda: "fitness", luvadetreino: "fitness",
  tapetedeyoga: "fitness", faixaelastica: "fitness", coletetraveltravessa: "fitness",

  // Moda / acessórios
  bolsa: "bolsaseacessorios", bolsas: "bolsaseacessorios", carteira: "bolsaseacessorios",
  necessaire: "bolsaseacessorios", mochila: "viagem", mochilas: "viagem",
  cinto: "moda", cintos: "moda", jaqueta: "moda", camiseta: "moda", camisetas: "moda",
  vestido: "moda", vestidos: "moda", calca: "moda", shorts: "moda", blusa: "moda",

  // Joias
  colar: "joias", colares: "joias", brinco: "joias", brincos: "joias",
  anel: "joias", aneis: "joias", pulseira: "joias", pulseiras: "joias",

  // Óculos e relógios
  oculos: "oculos", relogio: "relogios", relogios: "relogios",

  // Bebê
  mamadeira: "bebe", mamadeiras: "bebe", fralda: "bebe", fraldas: "bebe",
  chupeta: "bebe", chupetas: "bebe", carrinhodebebe: "bebe", berco: "bebe",
  babador: "bebe", babadores: "bebe", mordedor: "bebe", chocalho: "bebe",

  // Infantil
  brinquedo: "infantil", brinquedos: "infantil", quebracabeca: "infantil",
  boneca: "infantil", bonecas: "infantil", carrinhodebrinquedo: "infantil",
  pelucia: "infantil", pelucias: "infantil", ventosa: "infantil", girafa: "infantil",
  bicho: "infantil", massinha: "infantil", blocosdemontar: "infantil",

  // Pet
  coleira: "pet", coleiras: "pet", racao: "pet", brinquedopet: "pet",
  comedouro: "pet", casinhapet: "pet", caminha: "pet", petiscos: "pet",

  // Automotivo
  capa: "automotivo", tapetes: "automotivo", suportecelularcarro: "automotivo",
  aromatizante: "automotivo", capadebanco: "automotivo", parachoque: "automotivo",

  // Moto
  capacete: "moto", luvamoto: "moto", bau: "moto",

  // Escritório / papelaria
  suporte: "escritorio", cadeiraescritorio: "escritorio", mesa: "escritorio",
  caderno: "papelaria", canetas: "papelaria", planner: "papelaria", agenda: "papelaria",
  adesivo: "papelaria", marcador: "papelaria", estojo: "papelaria",

  // Ferramentas
  furadeira: "ferramentas", chavedefenda: "ferramentas", kitdeferramentas: "ferramentas",
  martelo: "ferramentas", trena: "ferramentas", parafusadeira: "ferramentas",

  // Jardim
  vasodeflor: "jardim", regador: "jardim", adubo: "jardim", tesouradejardim: "jardim",
  mudas: "jardim", sementes: "jardim",

  // Esportes / camping
  bicicleta: "esportes", patins: "esportes", skate: "esportes", bola: "esportes",
  barraca: "camping", lanterna: "camping", mochiladecamping: "camping", rede: "camping",

  // Higiene / saúde
  escovadedentes: "higiene", termometro: "saude", massageador: "saude", oximetro: "saude",
  fioflental: "higiene", absorvente: "higiene",

  // Eletrodomésticos
  ventilador: "eletrodomesticos", umidificador: "eletrodomesticos", climatizador: "eletrodomesticos",
  purificadordear: "eletrodomesticos",

  // Costura
  maquinadecostura: "costura", tecido: "costura", linha: "costura", agulha: "costura",

  // Masculino
  barbeador: "cabelosmasculino", trimmer: "cabelosmasculino", aparadordebarba: "cabelosmasculino",

  // Suplementos
  whey: "suplementos", creatina: "suplementos", multivitaminico: "suplementos",

  // Livros
  livro: "livros", livros: "livros", agendaescolar: "papelaria",

  // Segurança
  camera: "seguranca", alarme: "seguranca", fechadura: "seguranca",

  // Natal / festas
  arvoredenatal: "natal", enfeitedenatal: "natal", balao: "festa", baloes: "festa",
};

/**
 * Hashtags que NUNCA devem ser geradas, por serem genéricas demais
 * e não trazerem valor de SEO relacionado ao produto.
 */
export const BLOCKLIST = new Set([
  "shopee", "fyp", "fy", "foryou", "foryoupage", "viral", "promocao", "promoção",
  "achados", "achadinhos", "trend", "trending", "explore", "reels", "capcut",
  "tiktok", "instagram", "shorts", "youtube", "linkdabio", "seguidores", "curtidas",
  "oferta", "ofertas", "desconto", "descontos", "compreagora", "cupom", "frete",
]);
