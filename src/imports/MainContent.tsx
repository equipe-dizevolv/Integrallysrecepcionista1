import svgPaths from "./svg-72344dt3cz";

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-neutral-950">Configurações</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Gerencie suas preferências e configurações do sistema</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-[#244738] grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[14px] text-center text-white">Perfil</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Notificações</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Agenda</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start px-[16px] py-[6px] relative w-full">
          <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1e2939] text-[14px] text-center">Segurança</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-gray-100 h-[38px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[3px] h-[38px] items-center px-[3px] py-0 relative w-full">
          <Button />
          <Button1 />
          <Button2 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1beb9580} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="CardTitle">
      <Icon />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[28px] text-[16px] text-neutral-950 text-nowrap top-0 whitespace-pre">Perfil do Usuário</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6c757d] text-[16px] text-nowrap top-[-2px] whitespace-pre">Informações pessoais e profissionais</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[74px] relative shrink-0 w-[1346px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[20px_minmax(0px,_1fr)] h-[74px] pb-0 pt-[24px] px-[24px] relative w-[1346px]">
        <CardTitle />
        <CardDescription />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2caad200} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p370da580} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white h-[32px] left-0 rounded-[8px] top-0 w-[127.734px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon1 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[41px] text-[14px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">Alterar Foto</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[40px] w-[145.031px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6c757d] text-[12px] text-nowrap whitespace-pre">JPG, PNG ou GIF. Máx. 2MB</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[56px] left-[96px] top-[12px] w-[145.031px]" data-name="Container">
      <Button4 />
      <Paragraph1 />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 bg-[#244738] grow h-[80px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[80px] items-center justify-center relative w-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[20px] text-nowrap text-white whitespace-pre">CS</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[3.35544e+07px] size-[80px] top-0" data-name="Primitive.span">
      <Text />
    </div>
  );
}

function Settings() {
  return (
    <div className="absolute h-[80px] left-[24px] top-0 w-[1298px]" data-name="Settings">
      <Container2 />
      <PrimitiveSpan />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-[24px] top-[104px] w-[1298px]" data-name="Primitive.div" />;
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Nome Completo *</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Camila Santos</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Especialidade *</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Especialista Clínico</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function Settings1() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[58px] left-[24px] top-[129px] w-[1298px]" data-name="Settings">
      <Container3 />
      <Container4 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">CRM *</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">12345-SP</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel2 />
      <Input2 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">CPF *</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] opacity-50 relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">123.456.789-00</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel3 />
      <Input3 />
    </div>
  );
}

function Settings2() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[58px] left-[24px] top-[211px] w-[1298px]" data-name="Settings">
      <Container5 />
      <Container6 />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Email *</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">camila.santos@integrallys.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel4 />
      <Input4 />
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Telefone *</p>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f8f9fa] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">(11) 98765-4321</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel5 />
      <Input5 />
    </div>
  );
}

function Settings3() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[58px] left-[24px] top-[293px] w-[1298px]" data-name="Settings">
      <Container7 />
      <Container8 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Assinatura Digital</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f8f9fa] h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[64px] items-start px-[12px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#6c757d] text-[14px] text-nowrap whitespace-pre">Texto que aparecerá ao final de prescrições e atestados...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Settings4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[86px] items-start left-[24px] top-[375px] w-[1298px]" data-name="Settings">
      <PrimitiveLabel6 />
      <Textarea />
    </div>
  );
}

function PrimitiveDiv1() {
  return <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-[24px] top-[485px] w-[1298px]" data-name="Primitive.div" />;
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[18px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Preferências de Tema</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_158_654)" id="Icon">
          <path d={svgPaths.p3adb3b00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 1.33333V2.66667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 13.3333V14.6667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p345c8e00} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p191ca260} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H2.66667" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 8H14.6667" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13b9f700} id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3f5fc40} id="Vector_9" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_158_654">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveLabel7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Primitive.label">
      <Icon2 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[14px] left-[24px] text-[14px] text-neutral-950 text-nowrap top-[-1px] whitespace-pre">Modo Escuro</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#6c757d] text-[14px] text-nowrap whitespace-pre">Alterna entre tema claro e escuro</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[38px] relative shrink-0 w-[205.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-[205.094px]">
        <PrimitiveLabel7 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="bg-white relative rounded-[3.35544e+07px] shrink-0 size-[16px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[#cbced4] h-[18.391px] relative rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.391px] items-center p-px relative w-[32px]">
        <PrimitiveSpan1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <PrimitiveButton />
    </div>
  );
}

function Settings5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[82px] items-start left-[24px] top-[510px] w-[1298px]" data-name="Settings">
      <Heading1 />
      <Container10 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3c401780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56b0600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17caa400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#244738] h-[36px] left-[1157.83px] rounded-[8px] top-[616px] w-[164.172px]" data-name="Button">
      <Icon3 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[44px] text-[14px] text-nowrap text-white top-[6px] whitespace-pre">Salvar Alterações</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1346px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[1346px]">
        <Settings />
        <PrimitiveDiv />
        <Settings1 />
        <Settings2 />
        <Settings3 />
        <Settings4 />
        <PrimitiveDiv1 />
        <Settings5 />
        <Button5 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] h-[776px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <CardContent />
    </div>
  );
}

function Settings6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[918px] items-start relative shrink-0 w-full" data-name="Settings">
      <Container />
      <Container1 />
      <Card />
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="bg-white relative size-full" data-name="Main Content">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-0 pl-[24px] pr-[34px] pt-[24px] relative size-full">
          <Settings6 />
        </div>
      </div>
    </div>
  );
}