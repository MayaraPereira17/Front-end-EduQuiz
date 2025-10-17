import { Trophy, Users } from "lucide-react";

export function Stats() {
  return (
    <div className="grid grid-cols-2 w-1/2 gap-6">
      <div className="w-full border border-black/10 flex items-center p-6 rounded-2xl bg-white justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#4A5565]">Alunos Ativos</span>
          <span className="text-2xl text-[#155DFC] font-bold">4</span>
          <span className="text-[#00A63E] text-xs">
            Participando dos estudos
          </span>
        </div>

        <Users width={32} height={32} color="#155DFC" />
      </div>

      <div className="w-full border border-black/10 flex items-center p-6 rounded-2xl bg-white justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-[#4A5565]">Alunos Ativos</span>

          <span className="text-2xl text-[#00A63E] font-bold">86%</span>
          <span className="text-[#00A63E] text-xs">
            Performance nos quizzes
          </span>
        </div>

        <Trophy width={32} height={32} color="#D08700" />
      </div>
    </div>
  );
}
