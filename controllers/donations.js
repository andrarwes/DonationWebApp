const Article = require('../models/donationarticles');

module.exports.renderaddclothesform = (req, res) => {
    res.render('./donations/addclothes.ejs');
}

module.exports.addclothes = async (req, res) => {
    
    const article = new Article({
        title: req.body.article.title,
        description: req.body.article.description,
        location: req.body.article.location,
        category: req.body.article.category,
        images: req.files.map(f =>( {url:f.path, filename:f.filename})),
        owner: '60b3780874ff673f4097a6fc'
    });
    article.owner = req.user._id;
    await article.save();
    console.log(article);
    res.redirect(`/clothes/${article._id}`)
}

module.exports.renderaddhouseitemform = (req, res) => {
    res.render('./donations/addhouseitem.ejs');
}

module.exports.addhouseitem = async (req, res) => {
    const article = new Article({
        title: req.body.article.title,
        description: req.body.article.description,
        location: req.body.article.location,
        category: req.body.article.category,
        images: req.files.map(f =>( {url:f.path, filename:f.filename})),
        owner: '60b3780874ff673f4097a6fc'
    });
    article.owner = req.user._id;
    await article.save();
    res.redirect(`/house/${article._id}`)
}

module.exports.renderaddfooditemform = (req, res) => {
    res.render('./donations/addfooditem.ejs');
}

module.exports.addfooditem = async (req, res) => {
    const article = new Article({
        title: req.body.article.title,
        description: req.body.article.description,
        location: req.body.article.location,
        category: req.body.article.category,
        images: req.files.map(f =>( {url:f.path, filename:f.filename})),
        owner: '60b3780874ff673f4097a6fc'
    });
    article.owner = req.user._id;
    await article.save();
    res.redirect(`/food/${article._id}`)
}

module.exports.showallclothes = async (req, res) => {
    const articles = await Article.find({ category: "Articole vestimentare" });
    res.render('./donations/clothes', { articles });
}

module.exports.showallhouseitems = async (req, res) => {
    const articles = await Article.find({ category: "Obiecte de uz casnic" })
    res.render('./donations/house', { articles });
}

module.exports.showallfooditems = async (req, res) => {
    const articles = await Article.find({ category: "Alimente neperisabile" })
    res.render('./donations/food', { articles });
}

module.exports.showclothingitem = async (req, res) => {
    const clothingarticle = await Article.findById(req.params.id).populate('owner');
    console.log(clothingarticle);
    res.render('./donations/showclothing', { clothingarticle })
}

module.exports.editclothingitemform = async (req, res) => {
    const clothingarticle = await Article.findById(req.params.id)
    if (!clothingarticle) return res.redirect('/clothes');

    if (!clothingarticle.owner.equals(req.user._id)) {
        res.redirect(`/clothes/${clothingarticle._id}`)
    }
    res.render('./donations/editclothes', { clothingarticle })
}

module.exports.editclothingitem = async (req, res) => {
    const { id } = req.params;
    const clothingarticle = await Article.findById(id);
    if (!clothingarticle.owner.equals(req.user._id)) {
        return res.redirect(`/clothes/${clothingarticle._id}`)
    }
    const clothingart = await Article.findByIdAndUpdate(id, { ...req.body.article })
    res.redirect(`/clothes/${clothingarticle._id}`)
}

module.exports.deleteclothingitem = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/clothes');
}

module.exports.showhouseitem = async (req, res) => {
    const housearticle = await Article.findById(req.params.id).populate('owner');
    console.log(housearticle);
    res.render('./donations/showhouseitem', { housearticle })
}

module.exports.edithouseitemform = async (req, res) => {
    const housearticle = await Article.findById(req.params.id)
    if (!housearticle) return res.redirect('/house');

    if (!housearticle.owner.equals(req.user._id)) {
        res.redirect(`/house/${housearticle._id}`)
    }
    res.render('./donations/edithouseitem', { housearticle })

}

module.exports.edithouseitem = async (req, res) => {
    const { id } = req.params;
    const housearticle = await Article.findById(id);
    if (!housearticle.owner.equals(req.user._id)) {
        return res.redirect(`/house/${housearticle._id}`)
    }

    const houseart = await Article.findByIdAndUpdate(id, { ...req.body.article })
    res.redirect(`/house/${housearticle._id}`)

}

module.exports.deletehouseitem = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/house');
}

module.exports.showfooditem = async (req, res) => {
    const foodarticle = await Article.findById(req.params.id).populate('owner');
    console.log(foodarticle);
    res.render('./donations/showfooditem', { foodarticle })
}

module.exports.editfooditemform = async (req, res) => {
    const foodarticle = await Article.findById(req.params.id)
    if (!foodarticle) return res.redirect('/food');
    if (!foodarticle.owner.equals(req.user._id)) {
        res.redirect(`/food/${foodarticle._id}`)
    }
    res.render('./donations/editfooditem', { foodarticle })

}

module.exports.editfooditem = async (req, res) => {
    const { id } = req.params;
    const foodarticle = await Article.findById(id);
    if (!foodarticle.owner.equals(req.user._id)) {
        return res.redirect(`/food/${foodarticle._id}`)
    }
    const foodart = await Article.findByIdAndUpdate(id, { ...req.body.article })
    res.redirect(`/food/${foodarticle._id}`)

}

module.exports.deletefooditem = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/food');
}