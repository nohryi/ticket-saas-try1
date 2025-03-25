import { en } from "./en";

export const pt: typeof en = {
  common: {
    search: "Pesquisar tickets",
    status: {
      open: "Aberto",
      completed: "Concluído",
      all: "Todos",
    },
    priority: {
      high: "Alta",
      medium: "Média",
      low: "Baixa",
    },
    actions: {
      create: "Criar Ticket",
      update: "Atualizar",
      cancel: "Cancelar",
      save: "Salvar",
      delete: "Excluir",
      complete: "Concluir",
      reopen: "Reabrir",
      close: "Fechar",
    },
  },
  tickets: {
    title: "Tickets",
    newTicket: "Novo Ticket",
    details: {
      submitter: "Solicitante",
      location: "Localização",
      priority: "Prioridade",
      status: "Status",
      created: "Criado",
      updated: "Atualizado",
      description: "Descrição",
      image: "Imagem",
    },
    filters: {
      all: "Todos os Tickets",
      open: "Tickets Abertos",
      completed: "Tickets Concluídos",
    },
    form: {
      title: "Título",
      submitterName: "Nome do Solicitante",
      location: "Localização",
      priority: "Prioridade",
      description: "Descrição",
      image: "Imagem",
    },
  },
  header: {
    settings: "Configurações",
    language: "Idioma",
  },
  languages: {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    zh: "中文",
    ja: "日本語",
    tr: "Türkçe",
    es: "Español",
    yue: "粵語",
    ar: "العربية",
    pt: "Português",
  },
};
