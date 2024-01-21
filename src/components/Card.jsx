import RarityWhite from '../assets/card-rarity/Rarity_01.png'
import RarityBlue from '../assets/card-rarity/Rarity_02.png'
import RarityGreen from '../assets/card-rarity/Rarity_03.png'
import RarityRed from '../assets/card-rarity/Rarity_04.png'
import RarityPurple from '../assets/card-rarity/Rarity_05.png'
import RarityGold from '../assets/card-rarity/Rarity_06.png'

import IcAttack from '../assets/ic/ic_attack.png'
import IcHealth from '../assets/ic/ic_health.png'
import IcScore from '../assets/ic/ic_score.png'

import ThresholdWhite from '../assets/threshold/Threshold_white.png'
import ThresholdBlue from '../assets/threshold/Threshold_blue.png'
import ThresholdGreen from '../assets/threshold/Threshold_green.png'
import ThresholdRed from '../assets/threshold/Threshold_red.png'
import ThresholdPurple from '../assets/threshold/Threshold_purple.png'
import ThresholdGold from '../assets/threshold/Threshold_gold.png'

const raritys = {
    white: RarityWhite,
    blue: RarityBlue,
    green: RarityGreen,
    red: RarityRed,
    purple: RarityPurple,
    gold: RarityGold
}

const threshold = {
    white: ThresholdWhite,
    blue: ThresholdBlue,
    green: ThresholdGreen,
    red: ThresholdRed,
    purple: ThresholdPurple,
    gold: ThresholdGold
}

function Card({type, rarity, name, image, manna, attack, life, keywords, effect, footer, movements}) {

    function addMovements(movements) {
        let content = []
        for(let i = 0; i < movements; i++) {
            content.push(<img src={threshold[rarity]} width="32"></img>)
        }
        return content
    }

    return (
        <div className='card'>
            <img src={raritys[rarity]} alt="" className='card-front'/>
            <p className='card-name'>{name}</p>
            <p className='card-keywords'>{keywords}</p>
            <p className='card-effect'>{effect}</p>
            <p className='card-footer'>{footer}</p>
            <div className='card-movements'>
                {addMovements(movements)}
            </div>
            <div className='card-manna'>
                <img src={IcScore} alt="" width="62"/>
                <p>{manna}</p>
            </div>
            { type === 'unit' &&
            <div className='card-attack'>
                <img src={IcAttack} alt="" width="62"/>
                <p>{attack}</p>
            </div>
            }
            { type !== 'spell' &&
            <div className='card-life'>
                <img src={IcHealth} alt="" width="62"/>
                <p>{life}</p>
            </div>
            }
            <div className='card-avatar'>
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default Card