export interface Gua64BundleType {
  id: number;
  卦序: string;
  卦名: string;
  卦辭: GuaExplainationType;
  六爻一:Yao;
  六爻二:Yao;
  六爻三:Yao;
  六爻四:Yao;
  六爻五:Yao;
  六爻六:Yao;
  用爻?: UseYao;
}

export interface GuaExplainationType {
  卦象: string;
  卦文: string;
  卦白: string;
  象文: string;
  象釋: string;
}

export interface Yao {
  爻名: string;
  彖文: string;
  彖義: string;
  象文: string;
  象釋: string;
}

export interface UseYao{
    爻名: string;
    彖文: string;
    彖義: string;
    象文: string;
    象釋: string;
}
