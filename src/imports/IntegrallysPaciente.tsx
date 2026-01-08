import svgPaths from "./svg-aljdcenn2";

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[5.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[5.719px]">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-white top-[-1px] whitespace-pre">I</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#244738] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[118.797px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start relative w-[118.797px]">
        <p className="font-['Arial:Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-neutral-950 text-nowrap whitespace-pre">Integrallys</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[32px] items-center justify-center pl-0 pr-[0.016px] py-0 relative w-full">
          <Container />
          <Heading />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center">Faça login para acessar sua conta</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Paragraph />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#364153] text-[14px]">E-mail</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[10px] top-0 w-[354px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[44px] items-center overflow-clip pl-[44px] pr-[16px] py-0 relative rounded-[inherit] w-[354px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap whitespace-pre">Digite seu e-mail</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24d83580} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd919a80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-0 top-0 w-[354px]" data-name="Container">
      <Label />
      <Container3 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#364153] text-[14px]">Senha</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute bg-white h-[44px] left-0 rounded-[10px] top-0 w-[354px]" data-name="Password Input">
      <div className="box-border content-stretch flex h-[44px] items-center overflow-clip px-[44px] py-0 relative rounded-[inherit] w-[354px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap whitespace-pre">Digite sua senha</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1bf79e00} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
            <path d={svgPaths.pcb0000} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[322px] size-[20px] top-[12px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <PasswordInput />
      <Icon1 />
      <Button />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-0 top-[96px] w-[354px]" data-name="Container">
      <Label1 />
      <Container5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[112.66px] top-[195px] w-[128.688px]" data-name="Button">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#244738] text-[14px] text-center text-nowrap whitespace-pre">Esqueci minha senha</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#244738] h-[48px] left-0 rounded-[10px] top-[240px] w-[354px]" data-name="Button">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[177.2px] not-italic text-[16px] text-center text-nowrap text-white top-[10px] translate-x-[-50%] whitespace-pre">Entrar</p>
    </div>
  );
}

function Form() {
  return (
    <div className="h-[288px] relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container6 />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[462px] relative rounded-[14px] shrink-0 w-[420px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[32px] h-[462px] items-start pb-px pt-[33px] px-[33px] relative w-[420px]">
        <Container2 />
        <Form />
      </div>
    </div>
  );
}

function LoginScreenFigma() {
  return (
    <div className="absolute bg-gray-50 content-stretch flex h-[962px] items-center justify-center left-0 top-0 w-[1417px]" data-name="LoginScreenFigma">
      <Container7 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.56%_12.56%_12.5%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p11067680} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LoginScreenFigma1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col items-start left-[1347px] pb-px pt-[13px] px-[13px] rounded-[10px] size-[46px] top-[24px]" data-name="LoginScreenFigma">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon3 />
    </div>
  );
}

export default function IntegrallysPaciente() {
  return (
    <div className="bg-white relative size-full" data-name="Integrallys | Paciente">
      <LoginScreenFigma />
      <LoginScreenFigma1 />
    </div>
  );
}