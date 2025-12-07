import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

type ViewType = "home" | "auth" | "portal" | "payment";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; price: string } | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 24 часов",
    });
  };

  const handleServiceSelect = (service: { title: string; price: string }) => {
    setSelectedService(service);
    if (isAuthenticated) {
      setCurrentView("payment");
    } else {
      setCurrentView("auth");
    }
  };

  if (currentView === "auth") {
    return <AuthPage 
      onBack={() => setCurrentView("home")} 
      onSuccess={() => {
        setIsAuthenticated(true);
        setCurrentView(selectedService ? "payment" : "portal");
      }} 
    />;
  }

  if (currentView === "portal") {
    return <ClientPortal 
      onBack={() => setCurrentView("home")}
      onPayment={(service) => {
        setSelectedService(service);
        setCurrentView("payment");
      }}
    />;
  }

  if (currentView === "payment" && selectedService) {
    return <PaymentPage 
      service={selectedService}
      onBack={() => setCurrentView(isAuthenticated ? "portal" : "home")}
      onSuccess={() => {
        toast({
          title: "Оплата прошла успешно!",
          description: "Мы скоро свяжемся с вами для начала работы",
        });
        setCurrentView("portal");
      }}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            WebStudio
          </h1>
          <div className="flex gap-6 items-center">
            <a href="#services" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Услуги</a>
            <a href="#process" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Процесс</a>
            <a href="#reviews" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Отзывы</a>
            <a href="#contact" className="hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>Контакты</a>
            <Button variant="outline" onClick={() => setCurrentView(isAuthenticated ? "portal" : "auth")}>
              <Icon name="User" size={16} className="mr-2" />
              Личный кабинет
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 text-sm">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Создаём сайты под ключ
          </Badge>
          <h2 className="text-6xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ваш сайт мечты<br />за 7 дней
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Профессиональная разработка сайтов от 1500₽. Современный дизайн, быстрая загрузка и личный кабинет для контроля проекта
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => {
              const element = document.getElementById('services');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Icon name="Rocket" size={20} className="mr-2" />
              Заказать сайт
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Icon name="Play" size={20} className="mr-2" />
              Посмотреть примеры
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 animate-slide-up">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Наши услуги
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Создаём сайты любой сложности с прозрачным ценообразованием
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Layout",
                title: "Лендинг",
                price: "1 500₽",
                features: ["Одностраничный сайт", "Адаптивный дизайн", "Форма заявки", "SEO-оптимизация"]
              },
              {
                icon: "Store",
                title: "Интернет-магазин",
                price: "5 000₽",
                features: ["Каталог товаров", "Корзина и оплата", "Личный кабинет", "Админ-панель"],
                popular: true
              },
              {
                icon: "Layers",
                title: "Корпоративный сайт",
                price: "3 500₽",
                features: ["Многостраничная структура", "Блог и новости", "Портфолио", "Интеграции"]
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${service.popular ? 'border-primary border-2' : ''}`}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary mt-2">
                    {service.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    variant={service.popular ? "default" : "outline"}
                    onClick={() => handleServiceSelect(service)}
                  >
                    Выбрать и оплатить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Как мы работаем
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Прозрачный процесс разработки с контролем на каждом этапе
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "MessageSquare", title: "1. Обсуждение", desc: "Выясняем ваши пожелания и цели" },
              { icon: "Palette", title: "2. Дизайн", desc: "Создаём уникальный макет" },
              { icon: "Code", title: "3. Разработка", desc: "Пишем чистый код" },
              { icon: "Rocket", title: "4. Запуск", desc: "Публикуем и поддерживаем" }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={step.icon} size={36} className="text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Отзывы клиентов
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Более 100 довольных клиентов уже запустили свои проекты
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Анна Петрова", role: "Владелица магазина", text: "Отличная работа! Сайт получился именно таким, как я хотела. Заказы пошли уже в первую неделю", rating: 5 },
              { name: "Дмитрий Сидоров", role: "Фрилансер", text: "Быстро, качественно и по адекватной цене. Личный кабинет очень удобный, всегда видел статус работы", rating: 5 },
              { name: "Елена Иванова", role: "Стилист", text: "Спасибо за красивый лендинг! Клиенты в восторге от дизайна, записи увеличились в 3 раза", rating: 5 }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {review.name}
                      </CardTitle>
                      <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                        {review.role}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent style={{ fontFamily: 'Inter, sans-serif' }}>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-4xl font-bold text-center mb-4 gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Начните свой проект
          </h3>
          <p className="text-center text-muted-foreground mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
            Заполните форму, и мы свяжемся с вами в течение 24 часов
          </p>

          <Card className="shadow-2xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Ваше имя
                  </label>
                  <Input placeholder="Иван Иванов" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email
                  </label>
                  <Input type="email" placeholder="ivan@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Телефон
                  </label>
                  <Input type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Расскажите о проекте
                  </label>
                  <Textarea 
                    placeholder="Опишите, какой сайт вам нужен..." 
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            WebStudio
          </h4>
          <p className="text-slate-400 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Создаём сайты, которые работают на вас
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Mail" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
          <p className="text-slate-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2024 WebStudio. Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
};

const AuthPage = ({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) => {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [step, setStep] = useState<"input" | "code">("input");
  const [contactValue, setContactValue] = useState("");
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("code");
    toast({
      title: "Код отправлен!",
      description: `Проверьте ${authMethod === "email" ? "почту" : "SMS"}`,
    });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Успешный вход!",
      description: "Добро пожаловать в личный кабинет",
    });
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <Card className="shadow-2xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Вход в личный кабинет
            </CardTitle>
            <CardDescription className="text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              {step === "input" ? "Выберите способ входа" : "Введите код из сообщения"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "input" ? (
              <>
                <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "email" | "phone")} className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">
                      <Icon name="Mail" size={16} className="mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="phone">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Телефон
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSendCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {authMethod === "email" ? "Email адрес" : "Номер телефона"}
                    </label>
                    <Input
                      type={authMethod === "email" ? "email" : "tel"}
                      placeholder={authMethod === "email" ? "ivan@example.com" : "+7 (999) 123-45-67"}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Получить код
                  </Button>
                </form>
              </>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Код подтверждения
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Код отправлен на {contactValue}
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  Войти
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => setStep("input")}>
                  Изменить контакт
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ClientPortal = ({ onBack, onPayment }: { onBack: () => void; onPayment: (service: { title: string; price: string }) => void }) => {
  const orders = [
    {
      id: "WS-2024-001",
      name: "Интернет-магазин цветов",
      status: "В разработке",
      progress: 65,
      price: "5 000₽",
      date: "15.11.2024",
      stages: [
        { name: "Согласование ТЗ", status: "completed", date: "15.11.2024" },
        { name: "Создание дизайна", status: "completed", date: "20.11.2024" },
        { name: "Разработка функционала", status: "in-progress", date: "В процессе" },
        { name: "Тестирование", status: "pending", date: "Ожидание" },
        { name: "Запуск", status: "pending", date: "Ожидание" }
      ]
    },
    {
      id: "WS-2024-002",
      name: "Лендинг для стартапа",
      status: "Завершён",
      progress: 100,
      price: "1 500₽",
      date: "01.11.2024",
      stages: [
        { name: "Согласование ТЗ", status: "completed", date: "01.11.2024" },
        { name: "Создание дизайна", status: "completed", date: "03.11.2024" },
        { name: "Разработка", status: "completed", date: "05.11.2024" },
        { name: "Тестирование", status: "completed", date: "07.11.2024" },
        { name: "Запуск", status: "completed", date: "08.11.2024" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          На главную
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Личный кабинет
          </h1>
          <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
            Управляйте своими проектами
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Активных проектов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Завершённых проектов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                Всего потрачено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6 500₽</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Заказать новый проект
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Лендинг", price: "1 500₽", icon: "Layout" },
                { title: "Интернет-магазин", price: "5 000₽", icon: "Store" },
                { title: "Корпоративный сайт", price: "3 500₽", icon: "Layers" }
              ].map((service, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto flex-col py-6 hover:border-primary"
                  onClick={() => onPayment(service)}
                >
                  <Icon name={service.icon} size={32} className="mb-2" />
                  <div className="font-bold mb-1">{service.title}</div>
                  <div className="text-primary">{service.price}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Мои проекты
        </h2>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {order.name}
                    </CardTitle>
                    <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
                      {order.id} • Заказан {order.date}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={order.status === "Завершён" ? "bg-green-500" : "bg-gradient-to-r from-primary to-secondary"}>
                      {order.status}
                    </Badge>
                    <div className="text-lg font-bold mt-2">{order.price}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="text-sm font-medium">Прогресс</span>
                    <span className="text-sm font-bold text-primary">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {order.stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stage.status === 'completed' ? 'bg-green-500' :
                        stage.status === 'in-progress' ? 'bg-gradient-to-r from-primary to-secondary' :
                        'bg-slate-300'
                      }`}>
                        {stage.status === 'completed' && <Icon name="Check" size={14} className="text-white" />}
                        {stage.status === 'in-progress' && <Icon name="Clock" size={14} className="text-white" />}
                      </div>
                      <span className="flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>{stage.name}</span>
                      <span className="text-muted-foreground">{stage.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const PaymentPage = ({ 
  service, 
  onBack, 
  onSuccess 
}: { 
  service: { title: string; price: string }; 
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"sbp" | "card">("sbp");
  const { toast } = useToast();

  const handlePayment = () => {
    toast({
      title: "Переход к оплате...",
      description: `Оплата ${service.price} через ${paymentMethod === "sbp" ? "СБП" : "карту"}`,
    });
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const sbpPhone = "79822141678";
  const cardNumber = "2200153605042952";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <Card className="shadow-2xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Оплата заказа
            </CardTitle>
            <CardDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              {service.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Сумма к оплате:
                </span>
                <span className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {service.price}
                </span>
              </div>
            </div>

            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "sbp" | "card")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sbp">
                  <Icon name="Smartphone" size={16} className="mr-2" />
                  СБП
                </TabsTrigger>
                <TabsTrigger value="card">
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Карта
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sbp" className="space-y-4 mt-6">
                <div className="p-6 border-2 border-primary rounded-lg bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="Smartphone" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Система быстрых платежей
                      </h3>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Мгновенный перевод
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Номер получателя:
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input value={sbpPhone} readOnly className="font-mono" />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText(sbpPhone);
                            toast({ title: "Скопировано!" });
                          }}
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Icon name="Info" size={16} className="inline mr-2" />
                        Откройте приложение банка и переведите {service.price} по номеру телефона через СБП
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="card" className="space-y-4 mt-6">
                <div className="p-6 border-2 border-primary rounded-lg bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="CreditCard" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Оплата на карту
                      </h3>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Перевод по номеру карты
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Номер карты:
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input 
                          value={cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber} 
                          readOnly 
                          className="font-mono"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            navigator.clipboard.writeText(cardNumber);
                            toast({ title: "Скопировано!" });
                          }}
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Icon name="Info" size={16} className="inline mr-2" />
                        Переведите {service.price} на указанный номер карты любым удобным способом
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handlePayment} className="w-full text-lg py-6">
              <Icon name="CheckCircle" size={20} className="mr-2" />
              Я оплатил(а)
            </Button>

            <p className="text-xs text-center text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
              После подтверждения оплаты мы свяжемся с вами для начала работы над проектом
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
