import avengersBanerLogo from '../../resources/imgs/avengersBanerLogo.png';
import avengersBaner from '../../resources/imgs/avengersBaner.png';
import { Baner } from "../style/Baner";

const ComicsBaner = function() {
    return(
        <Baner>
            <img height={100} width={152}  src={avengersBaner} alt="Marvel characters" />
            <h2>New comics every week!<br/>Stay tuned!</h2>
            <img height={100} width={133} src={avengersBanerLogo} alt="Avangers logo" />
        </Baner>
    )
}

export { ComicsBaner };