import svgPaths from "./svg-cfsg2c5o57";

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[5.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[5.078px]">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">I</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#244738] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-start relative w-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-[20px] text-neutral-950 text-nowrap whitespace-pre">Integrallys</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[143px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[32px] items-center relative w-[143px]">
        <Container />
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[64px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[64px] items-center justify-center pb-px pt-0 px-0 relative w-[255px]">
        <Container1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1db6d780} id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[37.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[37.828px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Início</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[54.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[54.734px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Agenda</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#244738] h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon1 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18e6a68} id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[65.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[65.828px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Pacientes</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon2 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p31104300} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p258f0b00} id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 9.16667H13.3333" id="Vector_3" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H13.3333" id="Vector_4" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 9.16667H6.675" id="Vector_5" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 13.3333H6.675" id="Vector_6" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[74.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[74.391px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Prontuário</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon3 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcfbcf00} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[78.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[78.438px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Prescrições</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon4 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_137_6748)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_137_6748">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[127.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[127.281px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Evoluções Clínicas</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon5 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2fedb580} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.25 3.55832L13.75 7.84999" id="Vector_4" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[154.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[154.672px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">{`Suprimentos & Venda`}</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon6 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[69.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[69.891px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Relatórios</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon7 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2483b8c0} id="Vector" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #6C757D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[101.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[101.328px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Configurações</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[40px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[40px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon8 />
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[424px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pt-[16px] px-[16px] relative rounded-[inherit] w-[255px]">
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[862px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[862px] items-start pl-0 pr-px py-0 relative w-[256px]">
        <Container2 />
        <Navigation />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[63.25px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[63.25px]">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Agenda</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p6f1b00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[52px] rounded-[8px] size-[36px] top-0" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap text-right whitespace-pre">Dr. João Silva</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px relative shrink-0 text-[#6c757d] text-[12px] text-right">Especialista</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[44px] top-0 w-[83.688px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 bg-[rgba(36,71,56,0.1)] grow h-[32px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#244738] text-[16px] text-nowrap whitespace-pre">Dr</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[3.35544e+07px] size-[32px] top-[2px]" data-name="Primitive.span">
      <Text11 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[36px] left-[104px] top-0 w-[127.688px]" data-name="Container">
      <Container5 />
      <PrimitiveSpan />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p388cb800} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#dc3545] left-[20px] rounded-[8px] size-[20px] top-[-4px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip p-px relative rounded-[inherit] size-[20px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute left-0 rounded-[8px] size-[36px] top-0" data-name="Button">
      <Icon10 />
      <Badge />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[36px] relative shrink-0 w-[231.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[231.688px]">
        <Button9 />
        <Container6 />
        <Button10 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-[1406px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[64px] items-center justify-between pb-px pt-0 px-[24px] relative w-[1406px]">
        <Heading1 />
        <Container7 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[82.094px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start relative w-[82.094px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[24px] text-neutral-950 text-nowrap whitespace-pre">Agenda</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[26px] items-center justify-center px-[13px] py-[5px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">segunda-feira, 17 de novembro de 2025</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[32px] relative shrink-0 w-[339.953px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[32px] items-center relative w-[339.953px]">
        <Heading />
        <Badge1 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-[36px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-[36px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-[114px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[38px] items-center px-[3px] py-px relative w-[114px]">
        <Button11 />
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[45.016px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[45.016px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Dia</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="basis-0 bg-[#244738] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Semana</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[38px] items-center px-[3px] py-px relative w-full">
          <Button14 />
          <Button15 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[38px] relative shrink-0 w-[247.266px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[38px] items-center relative w-[247.266px]">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container11 />
    </div>
  );
}

function Button16() {
  return (
    <div className="basis-0 bg-[#244738] grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-center text-white">Todos</p>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Em Atendimento</p>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Aguardando</p>
        </div>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Atendidos</p>
        </div>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Agendamentos</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-gray-100 h-[38px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[3px] h-[38px] items-center px-[3px] py-0 relative w-full">
          <Button16 />
          <Button17 />
          <Button18 />
          <Button19 />
          <Button20 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[24px] w-[1298px]" data-name="CardTitle">
      <Icon14 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[28px] text-[16px] text-neutral-950 top-0 w-[92px]">Consultas (5)</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[43.594px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-0 whitespace-pre">Status:</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#51a2ff] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-0 whitespace-pre">Confirmação</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[84.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[84.031px]">
        <Container14 />
        <Text13 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#155dfc] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-0 whitespace-pre">Check-in</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[63.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[63.359px]">
        <Container16 />
        <Text14 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#00c950] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-0 whitespace-pre">Check-out</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[70.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[70.703px]">
        <Container18 />
        <Text15 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#f0b100] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text16() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-0 whitespace-pre">Atraso</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[50.688px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[50.688px]">
        <Container20 />
        <Text16 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#fb2c36] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] text-nowrap top-0 whitespace-pre">Cancelado</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[16px] relative shrink-0 w-[73.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-center relative w-[73.375px]">
        <Container22 />
        <Text17 />
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex gap-[24px] h-[44px] items-center left-[24px] pl-[12px] pr-0 py-0 rounded-[10px] top-[66px] w-[1298px]" data-name="Schedule">
      <Text12 />
      <Container15 />
      <Container17 />
      <Container19 />
      <Container21 />
      <Container23 />
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute h-[122px] left-px top-px w-[1346px]" data-name="CardHeader">
      <CardTitle />
      <Schedule />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[80.05px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Domingo</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">16</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[69px]">(0 consultas)</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph2 />
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[157.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[157.141px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-[78.72px] text-[12px] text-center text-gray-400 text-nowrap top-0 translate-x-[-50%] whitespace-pre">Sem consultas</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-px pl-[9px] pr-px pt-[40px] relative w-[175.141px]">
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-0 top-0 w-[175.141px]" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[80.05px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%] whitespace-pre">Segunda</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%] whitespace-pre">17</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[12px] text-[rgba(255,255,255,0.8)] text-center top-0 translate-x-[-50%] w-[69px]">(2 consultas)</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#244738] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph6 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">08:00</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Maria Silva</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dr. João Santos</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[62.359px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#193cb8] text-[11px] text-nowrap top-0 whitespace-pre">Confirmação</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#dbe8fe] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[78.359px]" data-name="Container">
      <Paragraph12 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#f0f5ff] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph9 />
        <Paragraph10 />
        <Paragraph11 />
        <Container28 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">08:30</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Pedro Costa</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dra. Ana Lima</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[43.406px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#1c398e] text-[11px] text-nowrap top-0 whitespace-pre">Check-in</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#bedbff] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[59.406px]" data-name="Container">
      <Paragraph16 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#d9e9ff] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph13 />
        <Paragraph14 />
        <Paragraph15 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start pb-px pl-[9px] pr-px pt-[8px] relative w-[175.141px]">
        <Container29 />
        <Container31 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[187.14px] top-0 w-[175.141px]" data-name="Container">
      <Container27 />
      <Container32 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.89px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Terça</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">18</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[69px]">(2 consultas)</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph17 />
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">09:15</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Laura Oliveira</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dr. Carlos Rocha</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[31.797px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#894b00] text-[11px] text-nowrap top-0 whitespace-pre">Atraso</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-[#fef9c2] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[47.797px]" data-name="Container">
      <Paragraph23 />
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#fff8e6] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph20 />
        <Paragraph21 />
        <Paragraph22 />
        <Container35 />
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">10:00</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Roberto Ferreira</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dra. Lucia Mendes</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[50.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#027a48] text-[11px] text-nowrap top-0 whitespace-pre">Check-out</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#d1fadf] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[66.141px]" data-name="Container">
      <Paragraph27 />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#e6f9f0] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph24 />
        <Paragraph25 />
        <Paragraph26 />
        <Container37 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start pb-px pl-[9px] pr-px pt-[8px] relative w-[175.141px]">
        <Container36 />
        <Container38 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[374.28px] top-0 w-[175.141px]" data-name="Container">
      <Container34 />
      <Container39 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.72px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Quarta</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">19</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[63px]">(1 consulta)</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph28 />
        <Paragraph29 />
        <Paragraph30 />
      </div>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">08:00</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Maria Silva</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dr. João Santos</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[62.359px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#193cb8] text-[11px] text-nowrap top-0 whitespace-pre">Confirmação</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#dbe8fe] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[78.359px]" data-name="Container">
      <Paragraph34 />
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#f0f5ff] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph31 />
        <Paragraph32 />
        <Paragraph33 />
        <Container42 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-px pl-[9px] pr-px pt-[8px] relative w-[175.141px]">
        <Container43 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[561.42px] top-0 w-[175.141px]" data-name="Container">
      <Container41 />
      <Container44 />
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.89px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Quinta</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">20</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[69px]">(2 consultas)</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph35 />
        <Paragraph36 />
        <Paragraph37 />
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">10:00</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Roberto Ferreira</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dra. Lucia Mendes</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[50.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#027a48] text-[11px] text-nowrap top-0 whitespace-pre">Check-out</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#d1fadf] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[66.141px]" data-name="Container">
      <Paragraph41 />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-[#e6f9f0] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph38 />
        <Paragraph39 />
        <Paragraph40 />
        <Container47 />
      </div>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="absolute h-[20px] left-[13px] top-[13px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#101828] text-[14px] text-nowrap top-0 whitespace-pre">14:30</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="absolute h-[18px] left-[13px] top-[37px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#364153] text-[13px] text-nowrap top-[-1px] whitespace-pre">Fernanda Torres</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="absolute h-[16px] left-[13px] top-[59px] w-[131.141px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[11px] text-nowrap top-0 whitespace-pre">Dr. Paulo Silva</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[2px] w-[52.594px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#9f0712] text-[11px] text-nowrap top-0 whitespace-pre">Cancelado</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#ffe2e2] h-[20px] left-[13px] rounded-[6px] top-[87px] w-[68.594px]" data-name="Container">
      <Paragraph45 />
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[#fff1f1] h-[120px] relative rounded-[10px] shrink-0 w-[157.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[120px] relative w-[157.141px]">
        <Paragraph42 />
        <Paragraph43 />
        <Paragraph44 />
        <Container49 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start pb-px pl-[9px] pr-px pt-[8px] relative w-[175.141px]">
        <Container48 />
        <Container50 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[748.56px] top-0 w-[175.141px]" data-name="Container">
      <Container46 />
      <Container51 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.72px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Sexta</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">21</p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[69px]">(0 consultas)</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph46 />
        <Paragraph47 />
        <Paragraph48 />
      </div>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[18px] relative shrink-0 w-[157.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[157.141px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-[78.72px] text-[12px] text-center text-gray-400 text-nowrap top-0 translate-x-[-50%] whitespace-pre">Sem consultas</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-px pl-[9px] pr-px pt-[40px] relative w-[175.141px]">
        <Paragraph49 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[935.7px] top-0 w-[175.141px]" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.88px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Sábado</p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.78px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">22</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[79.7px] text-[#6a7282] text-[12px] text-center top-0 translate-x-[-50%] w-[69px]">(0 consultas)</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#f8f9fa] h-[76px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[76px] items-start pb-0 pt-[12px] px-[8px] relative w-[175.141px]">
        <Paragraph50 />
        <Paragraph51 />
        <Paragraph52 />
      </div>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[18px] relative shrink-0 w-[157.141px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[157.141px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-[78.72px] text-[12px] text-center text-gray-400 text-nowrap top-0 translate-x-[-50%] whitespace-pre">Sem consultas</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[175.141px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_1px] border-gray-200 border-solid inset-0 pointer-events-none rounded-bl-[10px] rounded-br-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-px pl-[9px] pr-px pt-[40px] relative w-[175.141px]">
        <Paragraph53 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col h-[476px] items-start left-[1122.84px] top-0 w-[175.141px]" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Schedule1() {
  return (
    <div className="absolute h-[476px] left-[25px] top-[147px] w-[1298px]" data-name="Schedule">
      <Container26 />
      <Container33 />
      <Container40 />
      <Container45 />
      <Container52 />
      <Container55 />
      <Container58 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[648px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <Schedule1 />
    </div>
  );
}

function Schedule2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[772px] items-start relative shrink-0 w-full" data-name="Schedule">
      <Container12 />
      <Container13 />
      <Card />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-[1406px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pl-[24px] pr-[34px] pt-[24px] relative rounded-[inherit] w-[1406px]">
        <Schedule2 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="basis-0 grow h-[862px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[862px] items-start relative w-full">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="h-[862px] relative shrink-0 w-0" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[862px] w-0" />
    </div>
  );
}

export default function IntegrallysEspecialista() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Integrallys | Especialista">
      <Container4 />
      <Container59 />
      <Section />
    </div>
  );
}