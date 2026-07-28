const TEMPLATES = [
  // CURIOSIDADE
  { trigger: "curiosidade", text: () => "Ninguém me contou sobre isso e eu quase deixei passar." },
  { trigger: "curiosidade", text: () => "Tinha gente rindo de mim por comprar isso... até ver o resultado." },
  { trigger: "curiosidade", text: () => "Passei meses sem saber que isso existia." },
  { trigger: "curiosidade", text: () => "Achei que fosse só mais um produto, mas fiquei surpreso." },
  { trigger: "curiosidade", text: (p) => `Tem gente que nem sabe que ${p} existe ainda.` },
  { trigger: "curiosidade", text: (p) => `${p} tá silenciosamente resolvendo o que ninguém fala.` },
  { trigger: "curiosidade", text: (p) => `Toda vez que uso ${p} alguém me pergunta onde comprei.` },

  // DOR
  { trigger: "dor", text: () => "Se você também já perdeu tempo tentando resolver isso do jeito errado, presta atenção." },
  { trigger: "dor", text: () => "Todo dia era a mesma dor de cabeça, até eu mudar isso." },
  { trigger: "dor", text: () => "Gastei mais tentando 'economizar' do que se tivesse comprado direto." },
  { trigger: "dor", text: (p) => `Cansei de tentar resolver sem ${p} e não conseguir.` },
  { trigger: "dor", text: (p) => `Se você ainda não tem ${p}, provavelmente já sentiu esse problema.` },

  // BENEFÍCIO
  { trigger: "beneficio", text: () => "Uma mudança pequena, mas o impacto foi enorme no dia a dia." },
  { trigger: "beneficio", text: () => "É simples assim: menos esforço, mais resultado." },
  { trigger: "beneficio", text: () => "Comprei pensando em economizar tempo e acabei economizando dinheiro também." },
  { trigger: "beneficio", text: (p) => `${p} entrega mais do que promete.` },
  { trigger: "beneficio", text: (p) => `Depois de ${p}, minha rotina mudou de verdade.` },

  // SOLUÇÃO
  { trigger: "solucao", text: () => "Testei várias coisas antes e nada resolvia igual isso." },
  { trigger: "solucao", text: () => "Parei de procurar porque finalmente achei o que funciona." },
  { trigger: "solucao", text: (p) => `${p} resolveu em dias o que eu tentava resolver há meses.` },
  { trigger: "solucao", text: (p) => `Se você busca uma solução real, ${p} é o caminho.` },

  // DESCOBERTA
  { trigger: "descoberta", text: () => "Descobri isso comentando em outro post e não me arrependo." },
  { trigger: "descoberta", text: () => "Foi por acaso que encontrei, mas virou item essencial pra mim." },
  { trigger: "descoberta", text: (p) => `Quase ignorei ${p}, hoje não sei como vivia sem.` },
  { trigger: "descoberta", text: (p) => `${p} apareceu no meu feed e mudou minha rotina.` },

  // ESCASSEZ
  { trigger: "escassez", text: () => "Já vi esse tipo de oferta sumir do nada, então corre." },
  { trigger: "escassez", text: () => "O estoque tá acabando rápido, presenciei acontecer." },
  { trigger: "escassez", text: (p) => `Vi ${p} esgotar antes e voltar só semanas depois.` },
  { trigger: "escassez", text: (p) => `${p} com esse preço não deve durar muito.` },

  // POV
  { trigger: "pov", text: () => "POV: você acha que não precisa disso até testar por 3 dias." },
  { trigger: "pov", text: () => "POV: você economizou tempo só porque parou de adiar essa compra." },
  { trigger: "pov", text: (p) => `POV: você comprou ${p} sem saber que ia virar rotina.` },

  // COMPARAÇÃO
  { trigger: "comparacao", text: () => "Comparei com outras opções e essa venceu de longe." },
  { trigger: "comparacao", text: () => "A diferença de qualidade fica clara depois que você testa os dois." },
  { trigger: "comparacao", text: (p) => `Testei outras marcas antes de ${p} e não teve comparação.` },

  // GATILHO SOCIAL (prova/urgência real)
  { trigger: "social", text: () => "Várias pessoas comentaram perguntando onde comprei, então deixei o link." },
  { trigger: "social", text: () => "Não fui só eu que percebi a diferença, os comentários confirmam." },
  { trigger: "social", text: (p) => `Todo mundo que testou ${p} comentou a mesma coisa: por que não comprei antes.` },

  // CTA DIRETO (só quando faz sentido — reforço final)
  { trigger: "cta", text: () => "Tá disponível agora, clica no link antes que acabe." },
  { trigger: "cta", text: () => "Se chegou até aqui, é porque também sentiu que precisa disso." },
  { trigger: "cta", text: (p) => `Se identificou com isso, ${p} tá no link da bio.` },
];

const TRIGGER_LABELS = {
  dor: "Dor",
  curiosidade: "Curiosidade",
  beneficio: "Benefício",
  solucao: "Solução",
  escassez: "Escassez",
  pov: "POV",
  descoberta: "Descoberta",
  comparacao: "Comparação",
  social: "Prova Social",
  cta: "CTA Direto",
};

export function generateCaptionSuggestions(productName) {
  const product = productName?.trim() || "esse produto";

  const shuffled = [...TEMPLATES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return shuffled.map((template, index) => ({
    id: `sugestao-${index + 1}`,
    trigger: template.trigger,
    triggerLabel: TRIGGER_LABELS[template.trigger],
    text: template.text(product),
  }));
}
