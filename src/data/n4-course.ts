export type N4Module = "Vocabulary" | "Grammar" | "Kanji" | "Reading" | "Listening";

export type N4Lesson = {
  module: N4Module;
  slug: string;
  title: string;
  japanese: string;
  summary: string;
  points: Array<{ japanese: string; reading: string; meaning: string; note: string }>;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const lesson = (module: N4Module, slug: string, title: string, japanese: string, summary: string, points: N4Lesson["points"], question: string, options: string[], answer: number, explanation: string): N4Lesson => ({ module, slug, title, japanese, summary, points, question, options, answer, explanation });

export const n4Lessons: N4Lesson[] = [
  lesson("Vocabulary", "daily-routines", "Daily Routines", "日常生活", "နေ့စဉ်ဘဝမှာ မကြာခဏသုံးတဲ့ N4 စကားလုံးများ", [
    { japanese: "準備します", reading: "じゅんびします", meaning: "ပြင်ဆင်သည်", note: "旅行の準備をします。" }, { japanese: "間に合います", reading: "まにあいます", meaning: "အချိန်မီသည်", note: "電車に間に合いました。" }, { japanese: "続けます", reading: "つづけます", meaning: "ဆက်လုပ်သည်", note: "勉強を続けます。" }], "「準備します」の意味は？", ["မေ့လျော့သည်", "ပြင်ဆင်သည်", "စောင့်သည်"], 1, "準備します က တစ်ခုခုမလုပ်မီ ပြင်ဆင်တာကို ဆိုလိုပါတယ်။"),
  lesson("Vocabulary", "work-school", "Work & School", "仕事と学校", "အလုပ်နဲ့ကျောင်းမှာ သုံးတဲ့စကားလုံးများ", [
    { japanese: "会議", reading: "かいぎ", meaning: "အစည်းအဝေး", note: "午後、会議があります。" }, { japanese: "予定", reading: "よてい", meaning: "အစီအစဉ်", note: "今日の予定を確認します。" }, { japanese: "復習", reading: "ふくしゅう", meaning: "ပြန်လေ့လာခြင်း", note: "授業を復習します。" }], "「予定」にအနီးစပ်ဆုံးက ဘာလဲ။", ["အစီအစဉ်", "စာမေးပွဲ", "အားလပ်ရက်"], 0, "予定 ဆိုတာ ကြိုတင်စီစဉ်ထားတဲ့ plan/schedule ပါ။"),
  lesson("Vocabulary", "travel-transport", "Travel & Transport", "旅行と交通", "ခရီးသွားခြင်းနဲ့ သယ်ယူပို့ဆောင်ရေးအသုံးအနှုန်းများ", [
    { japanese: "乗り換えます", reading: "のりかえます", meaning: "ယာဉ်ပြောင်းစီးသည်", note: "新宿で電車を乗り換えます。" }, { japanese: "到着します", reading: "とうちゃくします", meaning: "ရောက်ရှိသည်", note: "九時に到着します。" }, { japanese: "片道", reading: "かたみち", meaning: "အသွားတစ်ကြောင်း", note: "片道の切符を買います。" }], "ဘူတာမှာ ယာဉ်ပြောင်းစီးတာကို ဘယ်လိုပြောမလဲ။", ["到着します", "乗り換えます", "出発します"], 1, "乗り換えます က train/bus စတာကို ပြောင်းစီးတာပါ။"),
  lesson("Vocabulary", "health-body", "Health & Body", "健康と体", "ကျန်းမာရေးနဲ့ ဆေးခန်းသုံး N4 ဝေါဟာရများ", [
    { japanese: "具合", reading: "ぐあい", meaning: "အခြေအနေ/နေထိုင်ကောင်းမှု", note: "体の具合が悪いです。" }, { japanese: "治ります", reading: "なおります", meaning: "ရောဂါပျောက်သည်", note: "風邪が治りました。" }, { japanese: "薬局", reading: "やっきょく", meaning: "ဆေးဆိုင်", note: "薬局で薬を買います。" }], "အအေးမိပျောက်သွားပြီ ဆိုရင် ဘယ်စကားလုံးသုံးမလဲ။", ["治りました", "壊れました", "増えました"], 0, "ရောဂါပျောက်တာအတွက် 治ります ကိုသုံးပါတယ်။"),
  lesson("Vocabulary", "feelings-personality", "Feelings & Personality", "気持ちと性格", "ခံစားချက်နဲ့ လူစရိုက်ဖော်ပြတဲ့စကားလုံးများ", [
    { japanese: "安心します", reading: "あんしんします", meaning: "စိတ်အေးရသည်", note: "話を聞いて安心しました。" }, { japanese: "残念", reading: "ざんねん", meaning: "စိတ်မကောင်းစရာ", note: "会えなくて残念です。" }, { japanese: "親切", reading: "しんせつ", meaning: "ကြင်နာတတ်သော", note: "親切な人です。" }], "「親切な人」は ဘယ်လိုလူမျိုးလဲ။", ["ကြင်နာတတ်သူ", "အလုပ်များသူ", "တိတ်ဆိတ်သူ"], 0, "親切 က ကူညီတတ်ပြီး ကြင်နာတဲ့သဘောပါ။"),
  lesson("Vocabulary", "weather-nature", "Weather & Nature", "天気と自然", "ရာသီဥတုနဲ့ သဘာဝအခြေအနေများ", [
    { japanese: "曇ります", reading: "くもります", meaning: "တိမ်ထူသည်", note: "午後から曇るでしょう。" }, { japanese: "地震", reading: "じしん", meaning: "ငလျင်", note: "昨日、地震がありました。" }, { japanese: "気温", reading: "きおん", meaning: "လေထုအပူချိန်", note: "気温が下がります。" }], "လေထုအပူချိန်ကို ဘာလို့ခေါ်သလဲ။", ["気分", "気温", "天気"], 1, "気温 က atmospheric temperature ဖြစ်ပါတယ်။"),

  lesson("Grammar", "potential-form", "Potential Form", "可能形", "လုပ်နိုင်စွမ်းကို ～られる／～える နဲ့ပြောခြင်း", [
    { japanese: "日本語が話せます。", reading: "にほんごが はなせます", meaning: "ဂျပန်လို ပြောနိုင်တယ်", note: "話します → 話せます" }, { japanese: "魚が食べられます。", reading: "さかなが たべられます", meaning: "ငါးစားနိုင်တယ်", note: "食べます → 食べられます" }], "漢字を（　）。", ["読めます", "読みますか", "読んで"], 0, "လုပ်နိုင်တယ်လို့ ပြောတာကြောင့် potential form 読めます ကိုသုံးပါတယ်။"),
  lesson("Grammar", "intention-plan", "Intention & Plans", "意向・予定", "～つもりです၊ ～予定です နဲ့ ရည်ရွယ်ချက်/အစီအစဉ်ပြောခြင်း", [
    { japanese: "来年、日本へ行くつもりです。", reading: "らいねん にほんへ いくつもりです", meaning: "နောက်နှစ် ဂျပန်သွားဖို့ ရည်ရွယ်ထားတယ်", note: "dictionary form + つもり" }, { japanese: "会議は三時に始まる予定です。", reading: "かいぎは さんじに はじまるよていです", meaning: "အစည်းအဝေး ၃ နာရီစဖို့ စီစဉ်ထားတယ်", note: "予定 = fixed schedule" }], "夏休みに旅行する（　）です。", ["つもり", "ながら", "ばかり"], 0, "ကိုယ်တိုင်ရည်ရွယ်ထားတာကို つもりです နဲ့ပြောပါတယ်။"),
  lesson("Grammar", "experience", "Past Experience", "経験", "～たことがあります နဲ့ အတွေ့အကြုံပြောခြင်း", [
    { japanese: "富士山に登ったことがあります。", reading: "ふじさんに のぼったことが あります", meaning: "ဖူဂျီတောင် တက်ဖူးတယ်", note: "た-form + ことがあります" }, { japanese: "納豆を食べたことがありません。", reading: "なっとうを たべたことが ありません", meaning: "နတ်တို မစားဖူးဘူး", note: "negative experience" }], "ဂျပန်ကိုသွားဖူးတယ် ဆိုတာရွေးပါ။", ["日本へ行くつもりです", "日本へ行ったことがあります", "日本へ行かなければなりません"], 1, "အတွေ့အကြုံအတွက် past form + ことがあります ဖြစ်ပါတယ်။"),
  lesson("Grammar", "while-doing", "Doing Two Actions", "～ながら", "လုပ်ရပ်နှစ်ခုကို တစ်ပြိုင်နက်လုပ်ခြင်း", [
    { japanese: "音楽を聞きながら勉強します。", reading: "おんがくを ききながら べんきょうします", meaning: "သီချင်းနားထောင်ရင်း စာလေ့လာတယ်", note: "ます-stem + ながら" }, { japanese: "歩きながら話しました。", reading: "あるきながら はなしました", meaning: "လမ်းလျှောက်ရင်း စကားပြောခဲ့တယ်", note: "main action comes last" }], "テレビを（　）ながら、ご飯を食べます。", ["見る", "見", "見て"], 1, "ながら ရှေ့မှာ ます ဖြုတ်ထားတဲ့ stem 見 ကိုသုံးပါတယ်။"),
  lesson("Grammar", "giving-receiving", "Giving & Receiving", "授受表現", "あげる・くれる・もらう ကို viewpoint မှန်မှန်သုံးခြင်း", [
    { japanese: "私は妹に本をあげました。", reading: "わたしは いもうとに ほんを あげました", meaning: "ညီမကို စာအုပ်ပေးခဲ့တယ်", note: "giver → other: あげる" }, { japanese: "友達が私に写真をくれました。", reading: "ともだちが わたしに しゃしんを くれました", meaning: "သူငယ်ချင်းက ကျွန်တော့်ကို ဓာတ်ပုံပေးခဲ့တယ်", note: "other → me: くれる" }], "友達（　）プレゼントをもらいました。", ["を", "から", "へ"], 1, "もらう မှာ ပေးသူကို に သို့မဟုတ် から နဲ့ပြပါတယ်။"),
  lesson("Grammar", "obligation-advice", "Rules & Advice", "義務・助言", "～なければならない၊ ～たほうがいい", [
    { japanese: "薬を飲まなければなりません。", reading: "くすりを のまなければ なりません", meaning: "ဆေးသောက်ရမယ်", note: "obligation" }, { japanese: "早く寝たほうがいいです。", reading: "はやく ねたほうが いいです", meaning: "စောစောအိပ်တာကောင်းတယ်", note: "advice" }], "熱があります。病院へ（　）ほうがいいです。", ["行った", "行くな", "行っている"], 0, "အကြံပေးပုံမှာ verb た-form + ほうがいい ကိုသုံးပါတယ်။"),
  lesson("Grammar", "conditionals", "Conditionals", "条件表現", "～たら၊ ～なら၊ ～と တို့ရဲ့ အခြေအနေအသုံး", [
    { japanese: "雨が降ったら、行きません。", reading: "あめが ふったら いきません", meaning: "မိုးရွာရင် မသွားဘူး", note: "specific condition" }, { japanese: "春になると、花が咲きます。", reading: "はるに なると はなが さきます", meaning: "နွေဦးရောက်ရင် ပန်းပွင့်တယ်", note: "natural result" }], "駅に着い（　）、電話してください。", ["たら", "ても", "ながら"], 0, "ရောက်ပြီးရင် ဖုန်းဆက်ပါဆိုတဲ့ condition အတွက် たら ဖြစ်ပါတယ်။"),
  lesson("Grammar", "reason-explanation", "Reason & Explanation", "理由・説明", "～ので၊ ～んです နဲ့ အကြောင်းရင်းရှင်းပြခြင်း", [
    { japanese: "用事があるので、先に帰ります。", reading: "ようじが あるので さきに かえります", meaning: "ကိစ္စရှိလို့ အရင်ပြန်မယ်", note: "ので is softer than から" }, { japanese: "どうして遅れたんですか。", reading: "どうして おくれたんですか", meaning: "ဘာလို့နောက်ကျခဲ့တာလဲ", note: "asks for explanation" }], "電車が遅れた（　）、遅刻しました。", ["ので", "まで", "しか"], 0, "အကြောင်းရင်းပြတာကြောင့် ので ကိုသုံးပါတယ်။"),
  lesson("Grammar", "seems-hearsay", "Seems & Hearsay", "そうです", "ပုံပေါ်ခြင်းနဲ့ ကြားသိရခြင်းကို そうです နဲ့ခွဲပြောခြင်း", [
    { japanese: "このケーキはおいしそうです。", reading: "このケーキは おいしそうです", meaning: "ဒီကိတ်မုန့် အရသာရှိမယ့်ပုံပဲ", note: "appearance" }, { japanese: "明日は雨だそうです。", reading: "あしたは あめだそうです", meaning: "မနက်ဖြန် မိုးရွာမယ်လို့ ကြားတယ်", note: "hearsay" }], "空が暗いです。雨が降り（　）です。", ["そう", "ような", "ため"], 0, "မြင်ရတဲ့အခြေအနေက မိုးရွာမယ့်ပုံဖြစ်လို့ stem + そうです သုံးပါတယ်။"),
  lesson("Grammar", "before-after", "Before & After", "前・後", "～前に၊ ～た後で နဲ့ လုပ်ရပ်အစဉ်ပြခြင်း", [
    { japanese: "寝る前に歯を磨きます。", reading: "ねるまえに はを みがきます", meaning: "မအိပ်ခင် သွားတိုက်တယ်", note: "dictionary form + 前に" }, { japanese: "食べた後で薬を飲みます。", reading: "たべたあとで くすりを のみます", meaning: "စားပြီးနောက် ဆေးသောက်တယ်", note: "た-form + 後で" }], "日本へ来る（　）日本語を勉強しました。", ["前に", "後で", "ながら"], 0, "မလာခင်ဆိုတော့ dictionary form + 前に ဖြစ်ပါတယ်။"),
  lesson("Grammar", "too-much-easy-hard", "Degree & Ease", "すぎる・やすい・にくい", "လွန်ကဲခြင်း၊ လွယ်/ခက်ခြင်းပြောခြင်း", [
    { japanese: "食べすぎました。", reading: "たべすぎました", meaning: "စားလွန်းသွားတယ်", note: "ます-stem + すぎる" }, { japanese: "この靴は歩きやすいです。", reading: "このくつは あるきやすいです", meaning: "ဒီဖိနပ်နဲ့ လမ်းလျှောက်လွယ်တယ်", note: "easy to do" }, { japanese: "この漢字は覚えにくいです。", reading: "このかんじは おぼえにくいです", meaning: "ဒီခန်းဂျီး မှတ်ရခက်တယ်", note: "hard to do" }], "この説明は分かり（　）です。", ["やすい", "すぎ", "ながら"], 0, "နားလည်လွယ်တယ်ဆိုတာ 分かりやすい ဖြစ်ပါတယ်။"),

  lesson("Kanji", "people-work", "People & Work Kanji", "人・仕事", "လူနဲ့အလုပ်ဆိုင်ရာ N4 Kanji", [
    { japanese: "働・員・者", reading: "はたらく・いん・しゃ", meaning: "အလုပ်လုပ်/ဝန်ထမ်း/ပုဂ္ဂိုလ်", note: "会社員・医者・働く" }, { japanese: "仕・事・業", reading: "し・ごと・ぎょう", meaning: "အလုပ်နှင့်လုပ်ငန်း", note: "仕事・授業・産業" }], "会社で働く人ကို ဘာခေါ်လဲ။", ["会社員", "学生", "店長"], 0, "会社員 က ကုမ္ပဏီဝန်ထမ်း ဖြစ်ပါတယ်။"),
  lesson("Kanji", "time-calendar", "Time & Calendar Kanji", "時・暦", "အချိန်၊ ကာလနဲ့ ပြက္ခဒိန် Kanji", [
    { japanese: "曜・週・末", reading: "よう・しゅう・まつ", meaning: "နေ့/ပတ်/အဆုံး", note: "曜日・今週・週末" }, { japanese: "昔・度・期", reading: "むかし・ど・き", meaning: "ရှေး/အကြိမ်/ကာလ", note: "昔・一度・期間" }], "「週末」の意味は？", ["ပတ်အစ", "ပိတ်ရက်အဆုံးပိုင်း", "လလယ်"], 1, "週末 က weekend ဖြစ်ပါတယ်။"),
  lesson("Kanji", "movement-travel", "Movement Kanji", "移動", "သွားလာခြင်းနဲ့ ခရီးဆိုင်ရာ Kanji", [
    { japanese: "運・転・乗", reading: "うん・てん・のる", meaning: "သယ်/လှည့်/စီး", note: "運転・乗車" }, { japanese: "降・着・発", reading: "おりる・ちゃく・はつ", meaning: "ဆင်း/ရောက်/ထွက်", note: "降りる・到着・出発" }], "「到着」にဆန့်ကျင်တဲ့စကားလုံးက？", ["出発", "乗車", "運転"], 0, "到着 = ရောက်ခြင်း၊ 出発 = ထွက်ခွာခြင်း ဖြစ်ပါတယ်။"),
  lesson("Kanji", "places-buildings", "Places & Buildings Kanji", "場所・建物", "နေရာနဲ့ အဆောက်အအုံ Kanji", [
    { japanese: "館・堂・院", reading: "かん・どう・いん", meaning: "အဆောက်အအုံဆိုင်ရာ suffix များ", note: "図書館・食堂・病院" }, { japanese: "階・庭・所", reading: "かい・にわ・しょ", meaning: "အထပ်/ခြံ/နေရာ", note: "二階・庭・場所" }], "စာကြည့်တိုက်ကိုရွေးပါ။", ["病院", "図書館", "食堂"], 1, "図書館 က စာကြည့်တိုက်ဖြစ်ပါတယ်။"),
  lesson("Kanji", "feelings-thinking", "Feelings & Thinking Kanji", "気持ち・考え", "ခံစားချက်နဲ့ တွေးခေါ်မှု Kanji", [
    { japanese: "思・考・知", reading: "おもう・かんがえる・しる", meaning: "ထင်/စဉ်းစား/သိ", note: "思う・考える・知る" }, { japanese: "心・配・意", reading: "こころ・はい・い", meaning: "စိတ်/ဝေ/အာရုံ", note: "心配・注意・意味" }], "စိုးရိမ်တယ်ဆိုတဲ့ Kanji စကားလုံးက？", ["安心", "心配", "注意"], 1, "心配する က စိုးရိမ်သည် ဖြစ်ပါတယ်။"),
  lesson("Kanji", "nature-weather", "Nature & Weather Kanji", "自然・天気", "သဘာဝနဲ့ရာသီဥတု Kanji", [
    { japanese: "晴・雪・風", reading: "はれ・ゆき・かぜ", meaning: "သာယာ/နှင်း/လေ", note: "晴れる・大雪・台風" }, { japanese: "海・島・湖", reading: "うみ・しま・みずうみ", meaning: "ပင်လယ်/ကျွန်း/အိုင်", note: "海外・島・湖" }], "「晴れ」の意味は？", ["မိုးရွာ", "နေသာ", "နှင်းကျ"], 1, "晴れ က မိုးကင်းပြီး နေသာတဲ့ရာသီဥတုပါ။"),
  lesson("Kanji", "communication", "Communication Kanji", "連絡", "ဆက်သွယ်ရေးနဲ့ သတင်းအချက်အလက် Kanji", [
    { japanese: "連・絡・伝", reading: "れん・らく・つたえる", meaning: "ဆက်/ချိတ်/ပြောပို့", note: "連絡・伝言" }, { japanese: "説・明・報", reading: "せつ・めい・ほう", meaning: "ရှင်း/လင်း/သတင်း", note: "説明・情報" }], "အကြောင်းအရာတစ်ခုရှင်းပြတာကို？", ["説明する", "連絡する", "相談する"], 0, "説明する = ရှင်းပြသည် ဖြစ်ပါတယ်။"),
  lesson("Kanji", "daily-actions", "Daily Action Kanji", "日常動作", "နေ့စဉ်လှုပ်ရှားမှု Kanji", [
    { japanese: "洗・掃・捨", reading: "あらう・そう・すてる", meaning: "ဆေး/ရှင်း/ပစ်", note: "洗濯・掃除・捨てる" }, { japanese: "開・閉・押", reading: "あける・しめる・おす", meaning: "ဖွင့်/ပိတ်/တွန်း", note: "開店・閉店・押す" }], "အမှိုက်ပစ်တယ်ကို ဘယ်လိုရေးမလဲ။", ["ごみを拾う", "ごみを捨てる", "ごみを洗う"], 1, "捨てる က မလိုတာကို စွန့်ပစ်တာပါ။"),

  lesson("Reading", "emails-messages", "Emails & Messages", "メール・伝言", "အီးမေးလ်နဲ့ အကြောင်းကြားစာထဲက ရည်ရွယ်ချက်ဖတ်ခြင်း", [
    { japanese: "明日の会議は十時から十一時に変わりました。資料を持ってきてください。", reading: "あしたの かいぎは…", meaning: "မနက်ဖြန်အစည်းအဝေးအချိန်ပြောင်းပြီး စာရွက်စာတမ်းယူလာရန်", note: "ပြောင်းသွားတဲ့အချိန်နဲ့ လုပ်ရမယ့် action ကိုရှာပါ။" }], "အစည်းအဝေးကို ဘယ်အချိန်စမလဲ။", ["၉ နာရီ", "၁၀ နာရီ", "၁၁ နာရီ"], 1, "十時から十一時 က ၁၀ နာရီမှ ၁၁ နာရီအထိ ဖြစ်ပါတယ်။"),
  lesson("Reading", "notices-rules", "Notices & Rules", "お知らせ・規則", "ကြေညာချက်နဲ့ စည်းကမ်းစာတွေကို ဖတ်ခြင်း", [
    { japanese: "図書館は工事のため、五月三日から五日まで休みます。本は入口の箱に返してください。", reading: "としょかんは こうじのため…", meaning: "ပြုပြင်ရေးကြောင့် မေ ၃ မှ ၅ အထိပိတ်ပြီး စာအုပ်ကိုဝင်ပေါက်သေတ္တာထဲပြန်ထည့်ရန်", note: "အကြောင်းရင်း၊ ရက်စွဲနဲ့ instruction ကိုခွဲပါ။" }], "စာကြည့်တိုက် ဘာကြောင့်ပိတ်တာလဲ။", ["အားလပ်ရက်ကြောင့်", "ပြုပြင်ရေးကြောင့်", "စာအုပ်မရှိလို့"], 1, "工事のため က ပြုပြင်ဆောက်လုပ်ရေးကြောင့်လို့ ဆိုလိုပါတယ်။"),
  lesson("Reading", "short-stories", "Short Stories", "短い文章", "ဖြစ်ရပ်အစဉ်နဲ့ ဇာတ်ကောင်ခံစားချက်ကိုဖတ်ခြင်း", [
    { japanese: "駅に着いてから、財布がないことに気づきました。家に電話すると、母が机の上にあると言いました。", reading: "えきに ついてから…", meaning: "ဘူတာရောက်မှ ပိုက်ဆံအိတ်မရှိတာသိပြီး အမေက စားပွဲပေါ်ရှိတယ်လို့ပြောခဲ့သည်", note: "ဖြစ်ရပ်အစဉ်: ရောက် → သတိထား → ဖုန်းဆက်" }], "ပိုက်ဆံအိတ် ဘယ်မှာရှိသလဲ။", ["ဘူတာမှာ", "စားပွဲပေါ်မှာ", "ရထားထဲမှာ"], 1, "机の上にある လို့ မိခင်က ပြောပါတယ်။"),
  lesson("Reading", "information-search", "Information Search", "情報検索", "ဇယား၊ အချိန်စာရင်းနဲ့ အခြေအနေကိုတိုက်ဖတ်ခြင်း", [
    { japanese: "スポーツセンター：平日 9:00–21:00／土日 10:00–18:00。水曜日は休館。", reading: "スポーツセンター…", meaning: "အားကစားစင်တာ—ရုံးရက် ၉–၂၁၊ စနေတနင်္ဂနွေ ၁၀–၁၈၊ ဗုဒ္ဓဟူးပိတ်", note: "မေးခွန်းရဲ့နေ့နဲ့ အချိန်နှစ်ခုလုံးတိုက်ပါ။" }], "စနေနေ့ ည ၇ နာရီ သွားလို့ရမလား။", ["ရတယ်", "မရဘူး", "အခမဲ့ရတယ်"], 1, "စနေ/တနင်္ဂနွေက 18:00 အထိပဲ ဖွင့်ပါတယ်။"),

  lesson("Listening", "daily-conversations", "Daily Conversations", "日常会話", "နေ့စဉ်စကားပြောထဲက အဓိက action ကိုနားထောင်ခြင်း", [
    { japanese: "すみません、この近くに郵便局がありますか。ええ、あの銀行の隣です。", reading: "すみません このちかくに…", meaning: "အနီးမှာစာတိုက်ရှိမရှိမေးပြီး ဘဏ်ဘေးမှာလို့ ဖြေသည်", note: "နေရာညွှန်စကား 隣・前・後ろ ကိုဖမ်းပါ။" }], "စာတိုက်က ဘယ်မှာလဲ။", ["ဘဏ်ဘေး", "ဘူတာရှေ့", "ဆိုင်နောက်"], 0, "銀行の隣 လို့ အသံထဲမှာပြောထားပါတယ်။"),
  lesson("Listening", "instructions", "Instructions & Order", "指示・順序", "ညွှန်ကြားချက်နဲ့ လုပ်ရပ်အစဉ်ကို နားထောင်ခြင်း", [
    { japanese: "まず名前を書いて、それからこの紙を受付に出してください。", reading: "まず なまえを かいて…", meaning: "အရင်နာမည်ရေးပြီးနောက် စာရွက်ကို reception သို့ပေးရန်", note: "まず၊ それから ကို နားထောင်ပါ။" }], "အရင်ဆုံး ဘာလုပ်ရမလဲ။", ["စာရွက်ပေးမယ်", "နာမည်ရေးမယ်", "အခကြေးငွေပေးမယ်"], 1, "まず名前を書いて = အရင်ဆုံးနာမည်ရေးပါ။"),
  lesson("Listening", "plans-changes", "Plans & Changes", "予定変更", "အချိန်၊ နေရာ ပြောင်းလဲချက်ကို နားထောင်ခြင်း", [
    { japanese: "映画は七時からですが、六時半に駅で会いませんか。では、駅の南口で。", reading: "えいがは しちじから…", meaning: "ရုပ်ရှင် ၇ နာရီ၊ ၆:၃၀ ဘူတာတောင်ဘက်ပေါက်မှာတွေ့ရန်", note: "event time နဲ့ meeting time မရောပါနှင့်။" }], "နှစ်ယောက် ဘယ်အချိန်တွေ့မလဲ။", ["၆ နာရီ", "၆ နာရီခွဲ", "၇ နာရီ"], 1, "六時半に駅で会う လို့ သဘောတူထားပါတယ်။"),
  lesson("Listening", "quick-response", "Quick Response", "即時応答", "စကားတိုတစ်ကြောင်းအတွက် သဘာဝကျတဲ့ပြန်ဖြေမှုရွေးခြင်း", [
    { japanese: "ちょっと窓を開けてもいいですか。", reading: "ちょっと まどを あけても いいですか", meaning: "ပြတင်းပေါက်ဖွင့်လို့ရမလား", note: "permission request ကို သဘောတူ/ငြင်းတဲ့ reply ရွေးပါ။" }], "သဘာဝအကျဆုံး အဖြေက？", ["はい、どうぞ。", "いいえ、開けました。", "窓があります。"], 0, "ခွင့်တောင်းတာကို လက်ခံရင် はい、どうぞ လို့ဖြေပါတယ်။"),
];

export const n4Modules: N4Module[] = ["Vocabulary", "Grammar", "Kanji", "Reading", "Listening"];
export const n4LessonHref = (item: N4Lesson) => `/learn/n4/${item.module.toLowerCase()}/${item.slug}`;
