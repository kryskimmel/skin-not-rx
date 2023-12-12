product_images_data = [
    # Neutrogena: Hydro Boost Water Gel with Hyaluronic Acid
    {"product_id": 1, "preview": True, "image_url": "https://images.heb.com/is/image/HEBGrocery/001828183-4?jpeg" },
    {"product_id": 1, "preview": False, "image_url": "https://www.byrdie.com/thmb/xdD6vljZzBHEUS8HP6v4GTo8_-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Neutrogena-Hydro-Boost-Water-Gel-4-efdb91fb58c9454e88dda69320938f50.jpg" },
    # La Roche-Posay: Anthelios Melt-in Milk Sunscreen SPF 60
    {"product_id": 2, "preview": True, "image_url": "https://crdms.images.consumerreports.org/prod/products/cr/models/403107-lotion-la-roche-posay-anthelios-melt-in-milk-sunscreen-spf-60-10025494.png" },
    {"product_id": 2, "preview": False, "image_url": "https://dsom-imager-prod.shipt.com/14225601-27/1-25042d8fd30f804279df278084611eb5.jpeg"},
    # Innisfree: Dewy Glow Jelly Cream with Jeju Cherry Blossom
    {"product_id": 3, "preview": True, "image_url": "https://us.innisfree.com/cdn/shop/products/DewyGlowJellyCream-1080x1080.jpg"},
    {"product_id": 3, "preview": False, "image_url": "https://i.pinimg.com/originals/9c/29/12/9c2912f4f8f273c4d22c81bb2157244b.png"},
    # The Ordinary: Salicylic Acid 2% Solution
    {"product_id": 4, "preview": True, "image_url": "https://static.thcdn.com/images/large/original//productimg/1600/1600/11429305-6714896459464898.jpg"},
    {"product_id": 4, "preview": False, "image_url": "https://beautygeekuk.com/wp-content/uploads/2017/06/The-Ordinary-Salicylic-Acid-2-Solution-Reviews-800x774.jpg"},
    # Jack Black: Protein Booster Skin Serum
    {"product_id": 5, "preview": True, "image_url": "https://www.getjackblack.com/Images/2012_ProteinBoosterSerum_2oz_WEB.png"},
    # Glow Recipe: Watermelon Glow AHA Night Treatment
    {"product_id": 6, "preview": True, "image_url": "https://i1.wp.com/blog.glowrecipe.com/wp-content/uploads/2022/08/glow_watermelonglow_0272.jpg"},
    # Saturday Skin: Intense Hydration Mask
    {"product_id": 7, "preview": True, "image_url": "https://media1.popsugar-assets.com/files/thumbor/31yDWZmCIjQ4ZR1ibEKUt2DRZIE=/fit-in/2000x2000/filters:format_auto():extract_cover():upscale()/2018/11/20/806/n/1922153/fe99c7d3643b6bc6_netimgGLj2vx.jpg"},
    # TONYMOLY: I'm Red Wine Pore Tightening Mask
    {"product_id": 8, "preview": True, "image_url": "https://tonymoly.us/cdn/shop/products/I_mRedWinePoreTighteningMask_1200x.png"},
    {"product_id": 8, "preview": False, "image_url": "https://tonymoly.us/cdn/shop/products/I_mRedWinePoreTighteningMask_ca8afb1a-82a3-498a-8f30-2f0f5e9eb5b0_1200x.png"},
    # TONYMOLY: Intense Care Gold 24K Snail Eye Serum
    {"product_id": 9, "preview": True, "image_url": "https://tonymoly.us/cdn/shop/files/IntenseCareGold24KSnailEyeSerumBall01_2048x.png"},
    # Shiseido: Wrinkle Smoothing Eye Cream
    {"product_id": 10, "preview": True, "image_url": "https://shiseido.ipscdn.net/sa2/dw/image/v2/BBSK_PRD/on/demandware.static/-/Sites-itemmaster_shiseido/default/dw495b4d42/images/2022/July/Top25/0730852155794_1.jpg"},
    {"product_id": 10, "preview": False, "image_url": "https://shiseido.ipscdn.net/sa2/dw/image/v2/BBSK_PRD/on/demandware.static/-/Sites-itemmaster_shiseido/default/dw84d00c56/images/2022/July/Top25/0730852155794_7.jpg"},
    # The Ordinary: AHA 30% + BHA 2% Peeling Solution
    {"product_id": 11, "preview": True ,"image_url": "https://static.thcdn.com/images/large/original//productimg/1600/1600/11429304-6515023393548618.jpg"},
    # Thayers: Rose Petal Facial Toner
    {"product_id": 12, "preview": True, "image_url": "https://i5.walmartimages.com/seo/Thayers-Witch-Hazel-Rose-Petal-Facial-Toner-8-5-fl-oz_acd37c3e-a0bf-42e6-8728-36b770844c62.73ee664cd16feacbf52f076e68b21b6d.jpeg"},
    # Beauty of Joseon: Glow Serum: Propolis + Niacinamide
    {"product_id": 13, "preview": True, "image_url": "https://www.shopbeautydepot.com/cdn/shop/products/beauty-of-joseon-face-care-beauty-of-joseon-glow-serum-30ml-30641082761302_1024x1024.jpg"},
    {"product_id": 13, "preview": False, "image_url": "https://www.kosbeauty.com/cdn/shop/products/fadaeaa97b7b60e0207d318c03aee95c.jpg"},
    # Elizabeth Arden: Eight Hour Cream Intensive Lip Repair Balm
    {"product_id": 14, "preview": True, "image_url": "https://images-eu.ssl-images-amazon.com/images/I/71YDYKb9rhL._AC_UL600_SR600,600_.jpg"},
    # COSRX: Advcanced Snail 96 Mucin Power Essence
    {"product_id": 15, "preview": True, "image_url": "https://cdn.shopify.com/s/files/1/0403/8200/5401/files/Advanced_Snail_96_Mucin_Power_Essence_2.jpg"},
    {"product_id": 15, "preview": False, "image_url": "https://wildfleursandco.com/cdn/shop/products/snailmucincosrxessence_1_1181x1476.jpg"},
    # Tatcha: The Rice Wash
    {"product_id": 16, "preview": True, "image_url": "https://i.pinimg.com/736x/f8/4e/b2/f84eb2dc5f3955132ac7b4791d2fa4ed.jpg"},
    {"product_id": 16, "preview": False, "image_url": "https://www.artistrybeautyblog.com/wp-content/uploads/2022/03/tatcha-rice-wash-1-1024x768.jpg"},
    # Laneige: Lip Sleeping Mask
    {"product_id": 17, "preview": True, "image_url": "https://viktoriyabeauty.com/cdn/shop/products/Instagram_3_900x900.png"},
    # Innisfree: Pore Clearing Clay Mask 2X
    {"product_id": 18, "preview": True, "image_url": "https://us.innisfree.com/cdn/shop/products/VCMaks_20ml.jpg"},
    {"product_id": 18, "preview": False, "image_url": "https://i5.walmartimages.com/asr/61ceb74b-ffb8-4a76-b1ad-941266a470d8.12a8cadc7ce2bc83a9dc778462f1ee4c.jpeg"},
    # Drunk Elephant: Beste™ No. 9 Jelly Cleanser
    {"product_id": 19, "preview": True, "image_url": "https://img.shopstyle-cdn.com/sim/09/c7/09c7597ef7d7bfab0aad492349771b4e_best/mini-bestetm-no-9-jelly-cleanser.jpg"},
    # Kiehls: Facial Fuel Daily Energizing Moisture Treatment for Men
    {"product_id": 20, "preview": True, "image_url": "https://www.kiehls.com/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-kiehls-master-catalog/default/dwee37f86f/nextgen/men/face-moisturizers/facial-fuel/facial-fuel-energizing-moisture-treatment-for-men/kiehls-men-face-moisturizer-facial-fuel-energizing-moisture-treatment-75ml-000-3700194714628-front.jpg?sw=1100&sh=1100&sm=cut&sfrm=png"},
]
