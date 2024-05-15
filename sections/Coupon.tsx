import { useSignal } from "@preact/signals";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/copy.tsx";

interface Props {
  coupon?: string;
}

export default function Section({ coupon = "SAOStore" }: Props) {
  const copied = useSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000); // Reseta o estado após 2 segundos
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col p-6 justify-center items-center">
      <div>
        <p className="text-2xl">
          Cupom de desconto
        </p>
      </div>

      <div
        className="flex justify-center items-center p-2 border-2 border-zinc-700 border-solid gap-4 mt-3 rounded cursor-pointer"
        onClick={handleCopy}
      >
        <p className="font-bold text-lg">
          {coupon}
        </p>
        <IconCopy class="w-6 h-6" />
      </div>

      {copied.value && <p className="text-green-500 mt-2">Copiado!</p>}
    </div>
  );
}
