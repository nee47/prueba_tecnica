import { ProductProps } from "../types/Product";
import { getSession } from "../session";
import DSButton from "./DSButton";
import EmailModal from "./ModalForm";

export default async function Product(props: ProductProps) {
  const authenticated = await getSession();
  const imgSrc = "http://localhost:5000/resources/" + props.img;
  return (
    <div className="flex flex-col md:flex-row items-center px-4 gap-x-4 w-full h-[250px]  border-b-2 border-slate-200">
      <img
        src={imgSrc}
        alt="pic"
        className="w-[200px] h-[200px] flex-shrink-0"
      />
      <div className="inline-flex flex-col gap-2">
        <h2 className="text-xl">{props.name}</h2>
        <p className="text-slate-500 text-sm">{props.description}</p>
        <div className="inline-flex gap-6">
          {authenticated ? <div>{`S/${props.price}`}</div> : <div>S/****</div>}
          {authenticated ? (
            <DSButton ds={props.datasheet}></DSButton>
          ) : (
            <EmailModal ds={props.datasheet} />
          )}
        </div>
      </div>
    </div>
  );
}
