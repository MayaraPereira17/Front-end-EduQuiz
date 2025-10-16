import { ArrowLeft } from "lucide-react";
import { RadioGroup } from "radix-ui";
import { labels, userType } from "../../mocks/register";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Register() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(
    "Aluno"
  );

  const selectedType = userType.find((ut) => ut.title === selectedUserType);

  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#C6DBEF] h-full flex-1 flex justify-center items-center overflow-auto py-11">
      <div className="bg-white p-10 min-w-96  rounded-4xl">
        <div className="flex gap-5 items-center">
          <button onClick={goBack}>
            <ArrowLeft />
          </button>

          <div className="space-y-2">
            <h4 className="text-base">Criar Conta</h4>
            <span className="text-sm text-[#404040]">
              Preencha seus dados para se cadastrar
            </span>
          </div>
        </div>
        <div className="space-y-4 mt-8">
          {labels.map((item) => (
            <div className="flex flex-col gap-2" key={item.label}>
              <label htmlFor="" className="text-sm font-medium">
                {item.label}
              </label>
              <input
                type="text"
                placeholder={item.placeholder}
                className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182] w-full"
              />
            </div>
          ))}

          <label htmlFor="" className="text-sm font-medium">
            Tipo de Usuário
          </label>

          <RadioGroup.Root
            value={selectedUserType || undefined}
            onValueChange={(value) => setSelectedUserType(value)}
            className="space-y-2.5"
          >
            {userType.map((item) => {
              const Icon = item.icon;
              return (
                <div className="flex items-center gap-2.5" key={item.title}>
                  <RadioGroup.Item
                    className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.title}
                  >
                    <RadioGroup.Indicator>
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>

                  <Icon />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-[#404040] text-sm">
                      {item.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </RadioGroup.Root>

          {selectedType && (
            <div className="mt-4 space-y-2">
              {selectedType?.fields &&
                selectedType.fields.map((field) => (
                  <div className="flex flex-col gap-2" key={field.label}>
                    <label htmlFor="">{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182] w-full"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        <button className="text-white bg-[#3182BD] w-full rounded-4xl py-3 px-2 font-bold mt-10">
          Entrar
        </button>
      </div>
    </div>
  );
}
