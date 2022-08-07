using AutoFixture;
using AutoFixture.Xunit2;
using Playmate.Social.UnitTests.Attributes.Customization;

namespace Playmate.Social.UnitTests.Attributes
{
    public class ApplicationUserWithoutTokenDataAttribute : AutoDataAttribute
    {
        public ApplicationUserWithoutTokenDataAttribute() : base(() =>
            new Fixture().Customize(new ApplicationUserWithoutTokenCustomization()))
        { }
    }
}