import React, {FC} from 'react';
import {Link} from "react-router-dom";

const HomePageTheme: FC = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-5" >
                        <Link to={{pathname: "/menu", state: { id: "female" }}}>
                            <img className="img-fluid" src="https://assets.laboutiqueofficielle.com/w_360,q_auto,f_auto/media/products/2022/07/15/guess_328652_FL7RS3LEA12_WHIPL_20220805T160403_01.jpg"/>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mb-5">
                        <Link to={{pathname: "/menu", state: { id: "male" }}}>
                            <img className="img-fluid" src="https://assets.laboutiqueofficielle.com/w_450,q_auto,f_auto/media/products/2022/10/12/tommy-hilfiger_344402_EM0EM00899_YBR_20221102T142409_01.jpg"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageTheme;
